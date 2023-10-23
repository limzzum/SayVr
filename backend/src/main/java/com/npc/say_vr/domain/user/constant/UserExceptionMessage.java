package com.npc.say_vr.domain.user.constant;

import lombok.Getter;
import lombok.RequiredArgsConstructor;

@Getter
@RequiredArgsConstructor
public enum UserExceptionMessage {
    USER_NOT_FOUND("존재하지 않는 유저입니다");

    private final String message;

}
