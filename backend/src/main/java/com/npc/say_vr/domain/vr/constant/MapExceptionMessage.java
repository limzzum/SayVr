package com.npc.say_vr.domain.vr.constant;

public enum MapExceptionMessage {
    NOT_EXIST_MAP("존재하지 않는 맵입니다");

    private final String message;

    MapExceptionMessage(String message) {
        this.message = message;
    }

    public String getMessage() {
        return this.message;
    }
}
