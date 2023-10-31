package com.npc.say_vr.domain.vr.constant;

import lombok.Getter;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;

@Getter
@RequiredArgsConstructor
public enum ConversationResponseMessage {
    CONVERSATION_CREATE_SUCCESS(HttpStatus.CREATED, "대화 생성 완료"),
    CONVERSATION_READ_SUCCESS(HttpStatus.OK, "대화 상세 조회 완료"),
    CONVERSATION_LIST_READ_SUCCESS(HttpStatus.OK, "대화 목록 조회 완료"),
    PROFICIENCY_READ_SUCCESS(HttpStatus.OK, "내 등급 조회 완료");

    private final HttpStatus httpStatus;
    private final String message;
}
