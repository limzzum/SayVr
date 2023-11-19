package com.npc.say_vr.domain.flashcards.exception;

import com.npc.say_vr.global.error.constant.ErrorCode;
import com.npc.say_vr.global.error.exception.CustomException;

public class FlashcardsException extends CustomException {

    public FlashcardsException(String message, ErrorCode errorCode) {
        super(message, errorCode);
    }

    public FlashcardsException(ErrorCode errorCode) {
        super(errorCode);
    }
}
