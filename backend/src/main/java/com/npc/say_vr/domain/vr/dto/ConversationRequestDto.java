package com.npc.say_vr.domain.vr.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

public class ConversationRequestDto {

    @Data
    @Builder
    @NoArgsConstructor
    @AllArgsConstructor
    public static class ConversationCreationRequestDto {

        private Long userId;

    }
}
