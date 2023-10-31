package com.npc.say_vr.domain.flashcards.service;

import com.npc.say_vr.domain.flashcards.dto.FlashcardsRequestDto.CreateWordcardRequestDto;
import com.npc.say_vr.domain.flashcards.dto.FlashcardsResponseDto.MessageOnlyResponseDto;
import com.npc.say_vr.domain.flashcards.dto.FlashcardsResponseDto.WordUpdateResponseDto;

public interface WordcardService {

    WordUpdateResponseDto createWordcard(Long userId, Long deckId,
        CreateWordcardRequestDto requestDto);

    //TODO: would reading one card at a time be needed
    //    PersonalDeck readDeckDetail(Long userId, Long deckId);

    WordUpdateResponseDto readTodaySentence();

    WordUpdateResponseDto updateWordcard(Long userId, Long wordcardId);

    WordUpdateResponseDto updateLearningProgress(Long userId, Long wordcardId, String status);

    MessageOnlyResponseDto deleteWordcard(Long userId, Long wordcardId);

    //TODO: undecided
    WordUpdateResponseDto readWordcard(Long wordcardId);


}
