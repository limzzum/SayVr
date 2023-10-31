package com.npc.say_vr.domain.game.dto;

import com.npc.say_vr.domain.game.constant.SocketType;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

public class GameRequestDto {

    @Data
    @Builder
    @NoArgsConstructor
    @AllArgsConstructor
    public static class GameStartRequestDto {
        private Long userId;
    }

    @Data
    @Builder
    @NoArgsConstructor
    @AllArgsConstructor
    public static class GameSocketRequestDto {
        private SocketType socketType;
        private String message;
    }

    @Data
    @Builder
    @NoArgsConstructor
    @AllArgsConstructor
    public static class SubmitAnswerRequestDto {
        private Long gameId;
        private Long userId;
        private String text;
    }

}
