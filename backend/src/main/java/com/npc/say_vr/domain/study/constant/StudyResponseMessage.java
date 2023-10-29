package com.npc.say_vr.domain.study.constant;

import lombok.Getter;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;

@Getter
@RequiredArgsConstructor
public enum StudyResponseMessage {
    STUDY_CREATE_SUCCESS(HttpStatus.CREATED,"스터디 생성 완료"),
    STUDY_READ_SUCCESS(HttpStatus.OK,"스터디 상세 조회 완료"),
    MINESTUDYS_READ_SUCCESS(HttpStatus.OK, "내 스터디 조회 완료"),
    STUDY_JOIN_SUCCESS(HttpStatus.CREATED,"스터디 가입 완료"),
    STUDYMEMBER_DELETE_SUCCESS(HttpStatus.ACCEPTED,"스터디 탈퇴 완료"),
    STUDY_UPDATE_SUCCESS(HttpStatus.ACCEPTED,"스터디 수정 완료"),
    GOAL_CREATE_SUCCESS(HttpStatus.CREATED,"목표 스프린트 생성 완료");

    private final HttpStatus httpStatus;
    private final String message;
}
