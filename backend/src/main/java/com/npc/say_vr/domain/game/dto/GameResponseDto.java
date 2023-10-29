package com.npc.say_vr.domain.game.dto;

import com.npc.say_vr.domain.game.constant.SocketType;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;

public class GameResponseDto {

    @Getter
    public static class GameStartResponseDto {

        private Long userId;

        @Builder
        public GameStartResponseDto(Long userId) {
            this.userId = userId;
        }
    }

    @Getter
    public static class GameWaitingResponseDto {
        private Long gameId;

        @Builder
        public GameWaitingResponseDto(Long gameId) {
            this.gameId = gameId;
        }
    }

    @Getter
    @Builder
    @AllArgsConstructor
    public static class GameSocketResponseDto {
        private SocketType socketType;
        private GameStatusDto gameStatusDto;
        private String text;

    }

}
