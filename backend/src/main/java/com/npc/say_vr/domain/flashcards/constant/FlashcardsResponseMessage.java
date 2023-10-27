package com.npc.say_vr.domain.flashcards.constant;

import lombok.Getter;
import lombok.RequiredArgsConstructor;

@Getter
@RequiredArgsConstructor
public enum FlashcardsResponseMessage {
    SUCCESS_CREATE_DECK("단어장 생성 성공"),
    SUCCESS_CREATE_WORD("단어 추가 성공");

    private final String message;

}
