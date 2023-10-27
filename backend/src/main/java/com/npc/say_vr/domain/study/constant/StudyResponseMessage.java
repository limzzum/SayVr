package com.npc.say_vr.domain.study.constant;

import lombok.Getter;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;

@Getter
@RequiredArgsConstructor
public enum StudyResponseMessage {
    STUDY_CREATE_SUCCESS(HttpStatus.CREATED,"스터디 생성 완료"),
    STUDY_READ_SUCCESS(HttpStatus.OK,"스터디 상세 조회 완료");

    private final HttpStatus httpStatus;
    private final String message;

}
