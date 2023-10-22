package com.npc.say_vr.global.error.exception;

public class NotFoundException extends IllegalArgumentException {

    public NotFoundException() {
    }

    public NotFoundException(String message) {
        super(message);
    }
}
