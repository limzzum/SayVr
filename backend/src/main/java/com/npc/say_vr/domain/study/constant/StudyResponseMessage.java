package com.npc.say_vr.domain.study.constant;

public enum StudyResponseMessage {
    STUDY_CREATE_SUCCESS("스터디 생성 완료");

    private final String message;

    StudyResponseMessage(String message) {
        this.message = message;
    }

    public String getMessage() {
        return this.message;
    }
}
