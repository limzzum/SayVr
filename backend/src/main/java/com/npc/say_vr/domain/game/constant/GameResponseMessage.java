package com.npc.say_vr.domain.game.constant;

import lombok.Getter;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;

@RequiredArgsConstructor
@Getter
public enum GameResponseMessage {
    GAME_WAITING_SUCCESS("게임 대기 등록 완료", HttpStatus.OK);

    private final String message;
    private final HttpStatus status;

}
