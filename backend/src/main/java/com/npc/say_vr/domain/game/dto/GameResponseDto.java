package com.npc.say_vr.domain.game.dto;

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

}