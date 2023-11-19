package com.npc.say_vr.domain.study.exception;

import com.npc.say_vr.global.error.constant.ErrorCode;
import com.npc.say_vr.global.error.exception.CustomException;

public class StudyException extends CustomException {

    public StudyException(String message, ErrorCode errorCode) {
        super(message, errorCode);
    }

    public StudyException(ErrorCode errorCode) {
        super(errorCode);
    }
}
