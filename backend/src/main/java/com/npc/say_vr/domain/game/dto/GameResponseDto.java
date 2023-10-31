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
    public static class GameSocketResponseDto<T> {
        private SocketType socketType;
        private GameStatusDto gameStatusDto;
        private T data;
        private String message;

    }
    @Getter
    @Builder
    @AllArgsConstructor
    public static class GameResultDto {
        private boolean isDraw;
        private Long winnerId;
        private Long loserId;
        private int winnerPoint;
        private int loserPoint;
        private int drawPoint;
    }

    @Getter
    @Builder
    @AllArgsConstructor
    public static class GameQuizResultDto {
        private Long userId;
        private boolean isAnswer;
    }


}
