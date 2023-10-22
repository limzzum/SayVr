package com.npc.say_vr.domain.vr.constant;

public enum MapResponseMessage {
    SUCCESS_GET_MAP_INFO("맵 조회 성공");

    private final String message;

    MapResponseMessage(String message) {
        this.message = message;
    }

    public String getMessage() {
        return this.message;
    }
}
