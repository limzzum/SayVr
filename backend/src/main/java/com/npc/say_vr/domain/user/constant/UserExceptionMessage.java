package com.npc.say_vr.domain.user.constant;

import lombok.Getter;
import lombok.RequiredArgsConstructor;

@Getter
@RequiredArgsConstructor
public enum UserExceptionMessage {

    NOT_EXIST_USER("존재하지 않는 유저입니다"),
    FILE_SIZE_LIMIT_EXCEEDED("파일 사이즈가 제한 크기를 초과합니다"),
    ALREADY_EXIST_USER("이미 존재하는 유저입니다");

    private final String message;
}
