package com.npc.say_vr.global.error.constant;

import lombok.Getter;
import lombok.RequiredArgsConstructor;

@Getter
@RequiredArgsConstructor
public enum ExceptionMessage {
    NOT_VALID_TOKEN("유효하지 않은 토큰입니다."),
    NOT_ALLOW_USER("인증되지 않은 사용자입니다."),
    NOT_VERIFIED_USER("유저 정보가 일치하지 않습니다."),
    FILE_SIZE_LIMIT_EXCEEDED("파일 사이즈가 제한 크기를 초과합니다");


    private final String message;
}
