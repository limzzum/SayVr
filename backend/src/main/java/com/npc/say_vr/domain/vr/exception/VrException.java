package com.npc.say_vr.domain.vr.exception;

import com.npc.say_vr.global.error.constant.ErrorCode;
import com.npc.say_vr.global.error.exception.CustomException;

public class VrException extends CustomException {

    public VrException(String message, ErrorCode errorCode) {
        super(message, errorCode);
    }

    public VrException(ErrorCode errorCode) {
        super(errorCode);
    }
}
