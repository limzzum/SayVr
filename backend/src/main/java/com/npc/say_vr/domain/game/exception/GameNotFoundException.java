package com.npc.say_vr.domain.game.exception;

public class GameNotFoundException extends IllegalArgumentException {

    public GameNotFoundException(String message) {
        super(message);
    }
}
