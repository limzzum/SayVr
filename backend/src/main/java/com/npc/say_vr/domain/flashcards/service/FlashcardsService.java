package com.npc.say_vr.domain.flashcards.service;

import com.npc.say_vr.domain.flashcards.dto.FlashcardsRequestDto.CreateFlashcardsRequestDto;
import com.npc.say_vr.domain.flashcards.dto.FlashcardsRequestDto.DeckSettingsUpdateRequestDto;
import com.npc.say_vr.domain.flashcards.dto.FlashcardsRequestDto.DeckUpdateRequestDto;
import com.npc.say_vr.domain.flashcards.dto.FlashcardsRequestDto.ReadDeckSearchRequestDto;
import com.npc.say_vr.domain.flashcards.dto.FlashcardsRequestDto.SearchRequestDto;
import com.npc.say_vr.domain.flashcards.dto.FlashcardsResponseDto.DeckCreateResponseDto;
import com.npc.say_vr.domain.flashcards.dto.FlashcardsResponseDto.DeckDetailResponseDto;
import com.npc.say_vr.domain.flashcards.dto.FlashcardsResponseDto.DeckListResponseDto;
import com.npc.say_vr.domain.flashcards.dto.FlashcardsResponseDto.MessageOnlyResponseDto;
import com.npc.say_vr.global.dto.ResponseDto;

public interface FlashcardsService {

    DeckCreateResponseDto createPersonalDeck(Long userId, CreateFlashcardsRequestDto requestDto);

    DeckCreateResponseDto createForkedDeck(Long userId, Long deckId);

    DeckListResponseDto readPrivateDecks(Long userId);

    DeckListResponseDto readPublicDecks();
    //TODO: what to do when deck is private and requested access, possible exception

    DeckListResponseDto readDeckSearch(Long userId, ReadDeckSearchRequestDto readDeckSearchRequestDto);

    DeckDetailResponseDto readDeckDetail(Long userId, Long deckId);

    DeckDetailResponseDto updateSavingProgressOption(Long userId, Long deckId,
        DeckUpdateRequestDto requestDto);

    DeckDetailResponseDto updateResetProgress(Long userId, Long deckId);

    DeckDetailResponseDto updateDeck(Long userId, Long deckId,
        DeckSettingsUpdateRequestDto requestDto);

    MessageOnlyResponseDto deleteDeck(Long userId, Long deckId);


}
