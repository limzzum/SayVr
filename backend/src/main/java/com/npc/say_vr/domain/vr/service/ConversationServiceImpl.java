package com.npc.say_vr.domain.vr.service;

import com.npc.say_vr.domain.user.domain.User;
import com.npc.say_vr.domain.user.repository.UserRepository;
import com.npc.say_vr.domain.vr.domain.Conversation;
import com.npc.say_vr.domain.vr.domain.Message;
import com.npc.say_vr.domain.vr.domain.Score;
import com.npc.say_vr.domain.vr.dto.ChatRequest;
import com.npc.say_vr.domain.vr.dto.ChatResponseDto.ChatResponse;
import com.npc.say_vr.domain.vr.dto.ConversationRequestDto.CreateConversationRequestDto;
import com.npc.say_vr.domain.vr.dto.ConversationResponseDto;
import com.npc.say_vr.domain.vr.dto.ConversationResponseDto.ConversationDatedListDto;
import com.npc.say_vr.domain.vr.dto.ConversationResponseDto.ConversationDto;
import com.npc.say_vr.domain.vr.dto.ConversationResponseDto.ConversationInfoResponseDto;
import com.npc.say_vr.domain.vr.dto.ConversationResponseDto.ConversationListResponseDto;
import com.npc.say_vr.domain.vr.dto.ConversationResponseDto.ProficiencyInfoResponseDto;
import com.npc.say_vr.domain.vr.dto.ConversationResponseDto.ScoreDto;
import com.npc.say_vr.domain.vr.dto.EvaluationDto;
import com.npc.say_vr.domain.vr.dto.OpenAIMessageDto;
import com.npc.say_vr.domain.vr.repository.ConversationRepository;
import com.npc.say_vr.domain.vr.repository.MessageRepository;
import com.npc.say_vr.domain.vr.repository.ScoreRepository;
import java.util.Arrays;
import java.util.List;
import java.util.stream.Collectors;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.client.RestTemplate;

@Slf4j
@Service
@RequiredArgsConstructor
@Transactional(readOnly = true) //TODO: transactional 노션에 정리하기
public class ConversationServiceImpl implements ConversationService {

    private final ConversationRepository conversationRepository;
    private final UserRepository userRepository;
    private final ScoreRepository scoreRepository;
    private final MessageRepository messageRepository;
    private final RestTemplate restTemplate;
    @Value("${spring.evaluate.openai.secret}")
    private String secret;
    @Value("${spring.evaluate.openai.model}")
    private String model;
    @Value("${spring.evaluate.url}")
    private String apiUrl;

    private final String INSTRUCTION =
        "You are a tutor who reviews dialogues and rates the grammar and contextual correctness, each with 0~100. You are to only evaluate the content of the one marked with the role user.\n"
            + "this is the criteria:\n"
            + "Overall Language Use\n"
            + "0-25: Makes more than 5 grammatical or lexical errors. Uses a very limited range of vocabulary and sentence structures. Language is often not appropriate for the context.\n"
            + "26-50: Makes 3-5 grammatical or lexical errors. Uses a limited range of vocabulary and sentence structures. Language is sometimes not appropriate for the context.\n"
            + "51-75: Makes 1-2 grammatical or lexical errors. Uses a moderate range of vocabulary and sentence structures. Language is generally appropriate for the context.\n"
            + "76-100: Makes no grammatical or lexical errors. Uses a wide range of vocabulary and sentence structures. Language is always appropriate for the context and is used in a sophisticated and nuanced way.\n"
            + "Communicative Effectiveness\n"
            + "0-25: Unable to convey ideas and feelings clearly, forced and unnatural conversation, no effort to understand AI\n"
            + "26-50: Sometimes conveys ideas and feelings clearly, somewhat forced and unnatural conversation, some effort to understand AI\n"
            + "51-75: Generally conveys ideas and feelings clearly, mostly natural and engaging conversation, good effort to understand AI\n"
            + "76-100: Consistently conveys ideas and feelings clearly, always natural and engaging conversation, strong effort to understand AI\n"
            + "Respond in JSON format, the review and situation needs to be in Korean\n"
            + "{\"grammar\":score ,\"context\":score,\"review\":\"short review of the user proficiency, faults and good points, explain why the points are taken off explained\", \"situation\":\"the conversation summary in one sentence\"}";

    //TODO: 예외처리 조회한 값이 존재하지 않을때 , 접근 불가할 때
    @Transactional
    @Override
    public ConversationDto createConversation(Long userId,
        CreateConversationRequestDto requestDto) {
        User user = userRepository.findById(userId).orElseThrow();
//        String dtoToString = requestDto.getRawJson();
//        log.info("data in string:{}",dtoToString);
        //TODO: how to rate the proficiency? and when to add them to the entity
        List<Message> messageList= requestDto.toMessageList();
        Conversation conversation = Conversation.builder()
            .messageList(messageList)
//            .review("review place holder")
//            .conversationContext(100)
//            .conversationGrammar(50)
//            .conversationPronunciation(75)
//            .situation("테스트 하는 상황")
            .user(user)
            .build();
        EvaluationDto evaluationDto = new EvaluationDto();
        conversation = conversationRepository.save(conversation);
        Conversation finalConversation = conversation;
        List<Message> messages = messageList.stream().map(message -> {
                message.updateConversation(finalConversation);
                return message;
            }
        ).collect(Collectors.toList());
        messageRepository.saveAll(messages);
        conversation.updateMessageList(messages);
        conversation = conversationRepository.save(conversation);
//TODO @Transactional dirty checking 으로 반복적으로 서로 값을 저장해주는 게 필요없어지는지

        calculateAndSaveAverageScoresForUser(userId);
        return new ConversationDto(conversation, conversation.getMessageList());
        //TODO: check if the returned dto contains ID
    }

    @Override
    public String evaluateConversation(
        String chatString) {
        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.APPLICATION_JSON);
        headers.set("Authorization", "Bearer " + secret);

        ChatRequest request = ChatRequest.builder()
            .model(model)
            .type("json_object")
            .openAIMessageDtos(
                (Arrays.asList(new OpenAIMessageDto("system", INSTRUCTION),
                    new OpenAIMessageDto("user", chatString))))
            .n(1)
            .temperature(0.7)
            .build();
        HttpEntity<ChatRequest> requestEntity = new HttpEntity<>(request, headers);

        ResponseEntity<ChatResponse> responseEntity = restTemplate.postForEntity(apiUrl,
            requestEntity, ChatResponse.class);
        if (responseEntity == null || responseEntity.getBody().getChoices() == null
            || responseEntity.getBody().getChoices().isEmpty()) {
            return "No response";
        }
        return responseEntity.getBody().getChoices().get(0).getOpenAIMessageDto().getContent();
    }

    public void calculateAndSaveAverageScoresForUser(Long userId) {
        User user = userRepository.findById(userId).orElseThrow();
        List<Conversation> userConversations = conversationRepository.findByUser_Id(userId);

        int totalGrammar = 0;
        int totalContext = 0;
        int totalPronunciation = 0;
        int all = 0;
        for (Conversation conversation : userConversations) {
            totalGrammar += conversation.getConversationGrammar();
            totalContext += conversation.getConversationContext();
            totalPronunciation += conversation.getConversationPronunciation();
        }
        all = totalContext + totalGrammar + totalPronunciation;
        int numConversations = userConversations.size();
        if (numConversations > 0) {
            int averageGrammar = (int) (totalGrammar / numConversations);
            int averageContext = (int) (totalContext / numConversations);
            int averagePronunciation = (int) (totalPronunciation / numConversations);
            int averageTotal = all / (numConversations * 3);
            Score score = Score.builder()
                .user(user)
                .grammarTotal(averageGrammar)
                .contextTotal(averageContext)
                .averageTotal(averageTotal)
                .pronunciationTotal(averagePronunciation)
                .build();

            scoreRepository.save(score);
        }
    }


    @Override
    public ProficiencyInfoResponseDto readProficiency(Long userId) {
        User user = userRepository.findById(userId).orElseThrow();
        List<Score> scoreList = scoreRepository.findByUser_Id(userId);
        if (scoreList.size() == 0) {
            Score basis = Score.builder()
                .user(user).pronunciationTotal(0).averageTotal(0).contextTotal(0).grammarTotal(0)
                .build();
            scoreRepository.save(basis);
        }
        Score current = scoreRepository.findFirstByUser_IdOrderByCreatedAtDesc(userId);
        log.info("최근 첫번째 점수 결과:{}", current);
        List<ScoreDto> scoreHistory = scoreList.stream()
            .map(ConversationResponseDto.ScoreDto::new)
            .collect(Collectors.toList());
        ScoreDto averageScore = new ScoreDto(current);
        return ProficiencyInfoResponseDto.builder()
            .scoreHistory(scoreHistory)
            .averageScore(averageScore)
            .build();
    }

    //TODO: 생성은 어떻게 할 것인지,, 채점 메소드 GPT, 우선은 생성해서 저장하는 부분만 생각하기


    @Override
    public ConversationListResponseDto readMyConversationList(Long userId) {
        List<Conversation> conversationList = conversationRepository.findByUser_Id(userId);
        //conversation.getMessageList to List<MessageDto>
        List<ConversationDto> conversationDtoList = conversationList.stream()
            .map(conversation -> new ConversationDto(conversation, conversation.getMessageList()))
            .toList();
        return ConversationListResponseDto.builder()
            .conversationList(conversationDtoList)
            .build();
    }

    @Override
    public ConversationDatedListDto readMonthlyConversationList(Long userId, int year, int month) {
        List<Conversation> conversationList = conversationRepository.findByUserIdAndYearAndMonth(
            userId, year,
            month);
        return new ConversationDatedListDto(conversationList);
    }

    @Override
    public ConversationInfoResponseDto readConversation(Long userId, Long conversationId) {
        Conversation conversation = conversationRepository.findById(conversationId).orElseThrow();
        return ConversationInfoResponseDto.builder()
            .conversation(new ConversationDto(conversation, conversation.getMessageList()))
            .build();
    }


}
