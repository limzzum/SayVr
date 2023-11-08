package com.npc.say_vr.domain.vr.dto;

import com.npc.say_vr.domain.vr.domain.Conversation;
import com.npc.say_vr.domain.vr.domain.Message;
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
    public static class CreateConversationRequestDto {

        //        private Long userId;
        private List<Message> messages;

        public List<Message> addConversation(Conversation conversation) {
            messages.stream().map(message -> {
                    message.updateConversation(conversation);
                    return message;
                }
            ).collect(Collectors.toList());
            return messages;
        }


    }
}
