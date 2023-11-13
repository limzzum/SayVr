package com.npc.say_vr.domain.vr.dto;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.npc.say_vr.domain.vr.domain.Conversation;
import com.npc.say_vr.domain.vr.domain.Message;
import java.io.Serializable;
import java.util.List;
import java.util.stream.Collectors;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

public class ConversationRequestDto {


    @Data
    @Builder
    @NoArgsConstructor
    @AllArgsConstructor
    public static class CreateConversationRequestDto implements Serializable {

        //        private Long userId;
        private List<OpenAIMessageDto> messages;

        public List<Message> toMessageList() {
            return messages.stream().map(message ->
                Message.builder().role(message.getRole()).content(message.getContent()).build()
            ).collect(Collectors.toList());
        }

        public String wholeString() {
            return "\"messages\": [" +
                messages.stream()
                    .map(OpenAIMessageDto::toString)
                    .collect(Collectors.joining(",\n")) +
                "]";
//            return messages.stream().map((message)->{return message.toString()}).collect(Collectors.joining("\n"));
        }

    }
}
