package com.npc.say_vr.domain.study.constant;

import lombok.Getter;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;

@Getter
@RequiredArgsConstructor
public enum StudyResponseMessage {
    STUDY_CREATE_SUCCESS(HttpStatus.CREATED,"스터디 생성 완료"),
    STUDY_READ_SUCCESS(HttpStatus.OK,"스터디 상세 조회 완료"),
    STUDY_READALL_SUCCESS(HttpStatus.OK,"스터디 전체 조회 완료"),
    STUDY_READKEYWORD_SUCCESS(HttpStatus.OK,"스터디 검색어 조회 완료"),
    MINESTUDYS_READ_SUCCESS(HttpStatus.OK, "내 스터디 조회 완료"),
    STUDY_JOIN_SUCCESS(HttpStatus.CREATED,"스터디 가입 완료"),
    STUDYMEMBER_DELETE_SUCCESS(HttpStatus.ACCEPTED,"스터디 탈퇴 완료"),
    STUDY_UPDATE_SUCCESS(HttpStatus.ACCEPTED,"스터디 수정 완료"),
    WEEKLY_CREATE_SUCCESS(HttpStatus.CREATED,"목표 스트린트 생성 완료"),
    WEEKLY_READ_SUCCESS(HttpStatus.OK,"목표 스트린트 조회 완료"),
    GOAL_CREATE_SUCCESS(HttpStatus.CREATED,"목표 생성 완료"),
    GOAL_UPDATE_SUCCESS(HttpStatus.ACCEPTED,"목표 수정 완료"),
    GOAL_DELETE_SUCCESS(HttpStatus.OK,"목표 삭제 완료"),
    CHECKLISTITEM_CREATE_SUCCESS(HttpStatus.CREATED,"체크리스트 생성 완료"),
    CHECKLISTITEM_UPDATE_SUCCESS(HttpStatus.ACCEPTED,"체크리스트 수정 완료"),
    CHECKLISTITEMSTATUS_UPDATE_SUCCESS(HttpStatus.ACCEPTED,"체크리스트 상태 수정 완료"),
    CHECKLISTITEM_DELETE_SUCCESS(HttpStatus.OK,"체크리스트 삭제 완료"),
    STUDYDECK_CREATE_SUCCESS(HttpStatus.CREATED,"스터디 단어장 생성 완료"),
    STUDYDECK_READ_SUCCESS(HttpStatus.OK,"스터디 단어장 조회 완료"),
    STUDYDECK_UPDATE_SUCCESS(HttpStatus.ACCEPTED,"스터디 단어장 수정 완료"),
    STUDYDECK_DELETE_SUCCESS(HttpStatus.OK,"스터디 단어장 삭제 완료"),
    STUDYDECKDETAIL_READ_SUCCESS(HttpStatus.OK,"스터디 단어장 상세 조회 완료"),
    STUDYWORDCARD_CREATE_SUCCESS(HttpStatus.CREATED,"스터디 단어장 단어 생성 완료"),
    STUDYWORDCARD_DELETE_SUCCESS(HttpStatus.OK,"스터디 단어장 단어 삭제 완료");

    private final HttpStatus httpStatus;
    private final String message;
}
