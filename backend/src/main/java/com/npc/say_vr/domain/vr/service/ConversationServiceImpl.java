package com.npc.say_vr.domain.vr.service;

import com.npc.say_vr.domain.user.domain.User;
import com.npc.say_vr.domain.user.repository.UserRepository;
import com.npc.say_vr.domain.vr.domain.Conversation;
import com.npc.say_vr.domain.vr.domain.Score;
import com.npc.say_vr.domain.vr.dto.ConversationRequestDto.CreateConversationRequestDto;
import com.npc.say_vr.domain.vr.dto.ConversationResponseDto;
import com.npc.say_vr.domain.vr.dto.ConversationResponseDto.ConversationDto;
import com.npc.say_vr.domain.vr.dto.ConversationResponseDto.ConversationListResponseDto;
import com.npc.say_vr.domain.vr.dto.ConversationResponseDto.ProficiencyInfoResponseDto;
import com.npc.say_vr.domain.vr.dto.ConversationResponseDto.ScoreDto;
import com.npc.say_vr.domain.vr.repository.ConversationRepository;
import com.npc.say_vr.domain.vr.repository.ScoreRepository;
import java.util.List;
import java.util.stream.Collectors;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Slf4j
@Service
@RequiredArgsConstructor
@Transactional(readOnly = true) //TODO: transactional 노션에 정리하기
public class ConversationServiceImpl implements ConversationService {

    private final ConversationRepository conversationRepository;
    private final UserRepository userRepository;
    private final ScoreRepository scoreRepository;

    @Override
    public ProficiencyInfoResponseDto readProficiency(Long userId) {
        List<Score> scoreList = scoreRepository.findByUser_Id(userId);
        Score current = scoreRepository.findFirstByUser_IdOrderByCreatedAtDesc(userId);
        List<ScoreDto> scoreHistory = scoreList.stream()
            .map(ConversationResponseDto.ScoreDto::new)
            .collect(Collectors.toList());
        ScoreDto averageScore = new ScoreDto(current);
        return ProficiencyInfoResponseDto.builder()
            .scoreHistory(scoreHistory)
            .averageScore(averageScore)
            .build();
    }

    public void calculateAndSaveAverageScoresForUser(Long userId) {
        User user = userRepository.findById(userId).orElseThrow();
        List<Conversation> userConversations = conversationRepository.findByUser_Id(userId);

        Integer totalGrammar = 0;
        Integer totalContext = 0;
        Integer totalPronunciation = 0;
        Integer all = 0;
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
    //TODO: 생성은 어떻게 할 것인지,, 채점 메소드 GPT, 우선은 생성해서 저장하는 부분만 생각하기

    @Transactional
    @Override
    public ConversationDto createConversation(Long userId,
        CreateConversationRequestDto createConversationRequestDto) {
        User user = userRepository.findById(userId).orElseThrow();
        //TODO: how to rate the proficiency? and when to add them to the entity
        Conversation conversation = Conversation.builder()
            .messageList(createConversationRequestDto.getMessages())
            .review("review place holder")
            .conversationContext(100)
            .conversationGrammar(50)
            .conversationPronunciation(75)
            .situation("테스트 하는 상황")
            .user(user)
            .build();
        conversation = conversationRepository.save(conversation);

        calculateAndSaveAverageScoresForUser(userId);

        return ConversationDto.builder()
            .conversation(conversation)
            .build();
        //TODO: check if the returned dto contains ID
    }


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
    //유저 확인을 또 해줄 필요가 있을까??Long userId,

    @Override
    public ConversationDto readConversation(Long userId, Long conversationId) {
        Conversation conversation = conversationRepository.findById(conversationId).orElseThrow();
        return ConversationDto.builder()
            .conversation(conversation)
            .build();
    }


}
