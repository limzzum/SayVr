package com.npc.say_vr.domain.user.exception;


public class UserExistException extends IllegalArgumentException {

    public UserExistException(String message) {
        super(message);
    }
}
