package com.npc.say_vr.domain.flashcards.service;

import com.npc.say_vr.domain.flashcards.domain.PersonalDeck;
import com.npc.say_vr.domain.flashcards.dto.FlashcardsRequestDto;
import com.npc.say_vr.global.dto.ResponseDto;

public interface FlashcardsService {

    ResponseDto createPersonalDeck(Long userId, Long deckId, FlashcardsRequestDto requestDto);

    ResponseDto createForkedDeck(Long userId, Long deckId);

    //TODO: what to do when deck is private and requested access, possible exception
    PersonalDeck readDeckDetail(Long userId, Long deckId);

    ResponseDto updateSavingProgressOption(Long userId, Long deckId,
        FlashcardsRequestDto requestDto);

    ResponseDto updateResetProgress(Long userId, Long deckId);

    ResponseDto updateDeck(Long userId, Long deckId, FlashcardsRequestDto requestDto);

    ResponseDto deleteDeck(Long userId, Long deckId);

}
