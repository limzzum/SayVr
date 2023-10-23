package com.npc.say_vr.domain.study.constant;

import lombok.Getter;
import lombok.RequiredArgsConstructor;

@Getter
@RequiredArgsConstructor
public enum StudyResponseMessage {
    STUDY_CREATE_SUCCESS("스터디 생성 완료");

    private final String message;

}
