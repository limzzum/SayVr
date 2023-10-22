package com.npc.say_vr.domain.vr.exception;

public class MapNotFoundException extends IllegalArgumentException {

    public MapNotFoundException(String message) {
        super(message);
    }
}
