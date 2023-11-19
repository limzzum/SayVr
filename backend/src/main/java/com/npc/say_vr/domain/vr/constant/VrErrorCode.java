package com.npc.say_vr.domain.vr.constant;

import com.npc.say_vr.global.error.constant.ErrorCode;

public enum VrErrorCode implements ErrorCode {
    CONVERSATION_NOT_FOUND("존재하지 않는 대화입니다","CONV_001",400);
    private String message;
    private String errorCode;
    private int statusCode;

    VrErrorCode(String message, String errorCode, int statusCode) {
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
