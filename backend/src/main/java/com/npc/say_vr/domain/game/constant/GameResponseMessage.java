package com.npc.say_vr.domain.game.constant;

import lombok.Getter;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;

@RequiredArgsConstructor
@Getter
public enum GameResponseMessage {
    GAME_WAITING_SUCCESS("게임 대기 등록 완료", HttpStatus.OK),
    GAME_START_MESSAGE("게임이 시작 되었습니다", HttpStatus.CREATED),
    GAME_STATUS_INFO("게임 상태 정보", HttpStatus.OK),
    GAME_IS_END("게임 종료", HttpStatus.OK),
    IS_ANSWER("정답입니다", null),
    IS_BAD_ANSWER("틀렸습니다", null),
    PLAYER_OUT_MESSAGE("상대방이 게임을 이탈하여 게임을 종료합니다.", null);

    private final String message;
    private final HttpStatus status;

}
