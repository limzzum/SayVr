package com.npc.say_vr.domain.vr.api;

import com.npc.say_vr.domain.vr.dto.ChatRequest;
import com.npc.say_vr.domain.vr.dto.ChatResponseDto.ChatResponse;
import com.npc.say_vr.domain.vr.dto.OpenAIMessageDto;
import java.util.List;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.client.RestTemplate;

@Slf4j
@CrossOrigin("*")
@RestController
@RequiredArgsConstructor
@RequestMapping("/api/evaluation")
public class ChatController {

    private final RestTemplate restTemplate;

    @Value("${spring.evaluate.openai.secret}")
    private String secret;
    @Value("${spring.evaluate.openai.model}")
    private String model;

    @Value("${spring.evaluate.url}")
    private String apiUrl;

    @PostMapping("/chat")
    public String chat(@RequestBody List<OpenAIMessageDto> prompt) {
        // create a request
        log.info("controller");

        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.APPLICATION_JSON);
        headers.set("Authorization", "Bearer " + secret);

        ChatRequest request = ChatRequest.builder()
            .model(model)
            .type("json_object")
            .openAIMessageDtos(prompt)
//                (Arrays.asList(new MessageDto("system",
//                        "You are a english language tutor who reviews dialogues and rates the grammar and contextual correctness/coherence, each with 100 percent as the full mark. The input will come as an array of messages that has two fields, role and content. You are to only evaluate the proficiency of the user. Taking into consideration of the context the system and assistant provides.."),
//                    new MessageDto("user", prompt)))
            .n(1) // You want one response
            .temperature(0.7) // Experiment with different temperature values
            .build();
//        ChatRequest request = new ChatRequest(model, prompt);
        log.info("prompt received:{}", prompt);
        // call the API
        HttpEntity<ChatRequest> requestEntity = new HttpEntity<>(request, headers);

        ResponseEntity<ChatResponse> responseEntity = restTemplate.postForEntity(apiUrl,
            requestEntity, ChatResponse.class);
        log.info("response returned:{}", responseEntity);
        if (responseEntity == null || responseEntity.getBody().getChoices() == null
            || responseEntity.getBody().getChoices().isEmpty()) {
            return "No response";
        }

        // return the first response
        return responseEntity.getBody().getChoices().get(0).getOpenAIMessageDto().getContent();
    }

}
