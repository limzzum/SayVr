package com.npc.say_vr.domain.flashcards.exception;

public class FlashcardsNotFoundException extends IllegalArgumentException {

    public FlashcardsNotFoundException(String message) {
        super(message);
    }
}
