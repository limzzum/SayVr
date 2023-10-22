package com.npc.say_vr.domain.user.exception;

public class UserNotFoundException extends IllegalArgumentException {

    public UserNotFoundException(String message) {
        super(message);
    }
}
