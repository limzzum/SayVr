package com.npc.say_vr.domain.flashcards.constant;

import com.npc.say_vr.global.error.constant.ErrorCode;

public enum FlashcardsErrorCode implements ErrorCode {
    ENGLISH_BOOK_NOT_FOUND("존재하지 않는 단어장입니다","WORDS_001",400),
    WORD_NOT_FOUND("존재하지 않는 단어입니다","WORDS_002",400),
    WORDS_SEARCH_NOT_FOUND("단어장 검색 결과가 없습니다.","WORDS_003",400);
    private String message;
    private String errorCode;
    private int statusCode;

    FlashcardsErrorCode(String message, String errorCode, int statusCode) {
        this.message = message;
        this.errorCode = errorCode;
        this.statusCode = statusCode;
    }
    @Override
    public String getMessage() {
        return message;
    }

    @Override
    public String getErrorCode() {
        return errorCode;
    }

    @Override
    public int getStatusCode() {
        return statusCode;
    }
}
