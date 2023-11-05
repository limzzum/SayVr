package com.npc.say_vr.domain.study.constant;

import lombok.Getter;
import lombok.RequiredArgsConstructor;

@Getter
@RequiredArgsConstructor
public enum StudyExceptionMessage {
    STUDY_NOT_FOUND("존재하지 않는 스터디입니다");

    private final String message;

}
