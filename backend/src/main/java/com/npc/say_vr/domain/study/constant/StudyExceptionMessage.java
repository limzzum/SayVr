package com.npc.say_vr.domain.study.constant;

public enum StudyExceptionMessage {
    STUDY_NOT_FOUND("존재하지 않는 스터디입니다");

    private final String message;

    StudyExceptionMessage(String message) {
        this.message = message;
    }

    public String getMessage() {
        return this.message;
    }
}
