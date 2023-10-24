package com.npc.say_vr.domain.game.constant;

import lombok.Getter;
import lombok.RequiredArgsConstructor;

@RequiredArgsConstructor
@Getter
public enum GameResponseMessage {
    GAME_START_SUCCESS("게임 시작 완료");

    private final String message;

}
