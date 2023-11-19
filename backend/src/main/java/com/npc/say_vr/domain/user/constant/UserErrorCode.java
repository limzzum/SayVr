package com.npc.say_vr.domain.user.constant;

import com.npc.say_vr.global.error.constant.ErrorCode;

public enum UserErrorCode implements ErrorCode {
    NICKNAME_EXIST_FOUND("중복된 닉네임 입니다.","USER_001",400),
    USERID_EXIST_FOUND("중복된 아이디 입니다.","USER_002",400);
    private String message;
    private String errorCode;
    private int statusCode;

    UserErrorCode(String message, String errorCode, int statusCode) {
        this.message = message;
        this.errorCode = errorCode;
        this.statusCode = statusCode;
    }
    @Override
    public String getMessage() {
        return message;
    }

    @Override
    public String getErrorCode() {
        return errorCode;
    }

    @Override
    public int getStatusCode() {
        return statusCode;
    }
}
