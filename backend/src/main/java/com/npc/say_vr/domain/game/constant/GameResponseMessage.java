package com.npc.say_vr.domain.game.constant;

import lombok.Getter;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;

@RequiredArgsConstructor
@Getter
public enum GameResponseMessage {
    GAME_WAITING_SUCCESS("게임 대기 등록 완료", HttpStatus.OK),
    GAME_IS_END("게임 종료", HttpStatus.OK),
    IS_ANSWER("정답입니다", null),
    IS_BAD_ANSWER("틀렸습니다", null);

    private final String message;
    private final HttpStatus status;

}
