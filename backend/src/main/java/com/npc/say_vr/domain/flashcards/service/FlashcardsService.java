package com.npc.say_vr.domain.flashcards.service;

import com.npc.say_vr.domain.flashcards.dto.FlashcardsRequestDto.CreateFlashcardsRequestDto;
import com.npc.say_vr.domain.flashcards.dto.FlashcardsRequestDto.DeckSettingsUpdateRequestDto;
import com.npc.say_vr.domain.flashcards.dto.FlashcardsRequestDto.DeckUpdateRequestDto;
import com.npc.say_vr.domain.flashcards.dto.FlashcardsRequestDto.SearchRequestDto;
import com.npc.say_vr.domain.flashcards.dto.FlashcardsResponseDto;
import com.npc.say_vr.domain.flashcards.dto.FlashcardsResponseDto.DeckDetailResponseDto;
import com.npc.say_vr.global.dto.ResponseDto;

public interface FlashcardsService {

    DeckDetailResponseDto createPersonalDeck(Long userId, CreateFlashcardsRequestDto requestDto);

    DeckDetailResponseDto createForkedDeck(Long userId, Long deckId);

    //TODO: what to do when deck is private and requested access, possible exception
    ResponseDto readDeckSearch(Long userId, SearchRequestDto searchRequestDto);

    DeckDetailResponseDto readDeckDetail(Long userId, Long deckId);

    DeckDetailResponseDto updateSavingProgressOption(Long userId, Long deckId,
        DeckUpdateRequestDto requestDto);

    DeckDetailResponseDto updateResetProgress(Long userId, Long deckId,
        DeckUpdateRequestDto requestDto);

    DeckDetailResponseDto updateDeck(Long userId, Long deckId,
        DeckSettingsUpdateRequestDto requestDto);

    FlashcardsResponseDto deleteDeck(Long userId, Long deckId);

}
