package com.npc.say_vr.domain.game.constant;

import lombok.Getter;
import lombok.RequiredArgsConstructor;

@RequiredArgsConstructor
@Getter
public enum GameExceptionMessage {
    GAME_NOT_FOUND("해당 게임 미존재"),
    GAME_FINISHED("종료된 게임");

    private final String message;

}
