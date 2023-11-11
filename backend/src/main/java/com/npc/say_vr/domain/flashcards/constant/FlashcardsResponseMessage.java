package com.npc.say_vr.domain.flashcards.constant;

import lombok.Getter;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;

@Getter
@RequiredArgsConstructor
public enum FlashcardsResponseMessage {
    SUCCESS_CREATE_DECK(HttpStatus.CREATED, "단어장 생성 성공"),
    SUCCESS_CREATE_FORK(HttpStatus.CREATED, "단어장 복사 성공"),
    SUCCESS_CREATE_WORD(HttpStatus.CREATED, "단어 추가 성공"),
    SUCCESS_CREATE_TRANSLATION(HttpStatus.CREATED, "단어 번역 성공"),
    SUCCESS_READ_TODAY_SENTENCE(HttpStatus.OK, "오늘의 문장 조회 성공"),
    SUCCESS_READ_PRIVATE_DECK(HttpStatus.OK, "개인 단어장 목록조회 성공"),
    SUCCESS_READ_PUBLIC_DECK(HttpStatus.OK, "공개 단어장 목록조회 성공"),
    SUCCESS_READ_DECK_DETAIL(HttpStatus.OK, "단어장 조회 성공"),
    SUCCESS_READ_DECK_SEARCH(HttpStatus.OK, "단어장 검색 성공"),
    SUCCESS_READ_WORD(HttpStatus.OK, "단어 조회 성공"),
    SUCCESS_UPDATE_DECK_SAVING(HttpStatus.OK, "단어장 복습모드 변경 성공"),
    SUCCESS_UPDATE_DECK_RESET(HttpStatus.OK, "단어장 복습모드 초기화 성공"),
    SUCCESS_UPDATE_DECK(HttpStatus.OK, "단어장 수정 성공"),
    SUCCESS_UPDATE_WORDCARD(HttpStatus.OK, "단어 수정 성공"),
    SUCCESS_UPDATE_LEARNING_STATUS(HttpStatus.OK, "단어 학습상태 수정 성공"),
    SUCCESS_DELETE_DECK(HttpStatus.OK, "단어장 삭제 성공"),
    SUCCESS_DELETE_WORDCARD(HttpStatus.OK, "단어 삭제 성공");

    private final HttpStatus httpStatus;
    private final String message;

}
