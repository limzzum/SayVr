package com.npc.say_vr.domain.game.constant;

public enum GameResponseMessage {
    GAME_START_SUCCESS("게임 시작 완료");

    private final String message;

    GameResponseMessage(String message) {
        this.message = message;
    }

    public String getMessage() {
        return this.message;
    }
}
