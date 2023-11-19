package com.npc.say_vr.domain.user.exception;

import com.npc.say_vr.global.error.constant.ErrorCode;
import com.npc.say_vr.global.error.exception.CustomException;

public class UserException extends CustomException {

    public UserException(String message, ErrorCode errorCode) {
        super(message, errorCode);
    }

    public UserException(ErrorCode errorCode) {
        super(errorCode);
    }
}
