package com.npc.say_vr.domain.user.constant;

public enum UserExceptionMessage {
    USER_NOT_FOUND("존재하지 않는 유저입니다");

    private final String message;

    UserExceptionMessage(String message) {
        this.message = message;
    }

    public String getMessage() {
        return this.message;
    }
}
