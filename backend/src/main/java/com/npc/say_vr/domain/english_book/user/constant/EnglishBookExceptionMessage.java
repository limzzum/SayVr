package com.npc.say_vr.domain.english_book.user.constant;

public enum EnglishBookExceptionMessage {
    ENGLISH_BOOK_NOT_FOUND("존재하지 않는 단어장입니다");

    private final String message;

    EnglishBookExceptionMessage(String message) {
        this.message = message;
    }

    public String getMessage() {
        return this.message;
    }
}
