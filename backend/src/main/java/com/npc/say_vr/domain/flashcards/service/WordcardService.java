package com.npc.say_vr.domain.flashcards.service;

import com.npc.say_vr.domain.flashcards.dto.FlashcardsResponseDto.WordUpdateResponseDto;

public interface WordcardService {

    WordUpdateResponseDto createWordcard(Long userId, Long deckId);

    //TODO: would reading one card at a time be needed
    //    PersonalDeck readDeckDetail(Long userId, Long deckId);

    WordUpdateResponseDto readTodaySentence();

    WordUpdateResponseDto updateWordcard(Long userId, Long wordcardId);

    WordUpdateResponseDto updateLearningProgress(Long userId, Long wordcardId);

    WordUpdateResponseDto deleteWordcard(Long userId, Long deckId);

    //TODO: undecided
    WordUpdateResponseDto readWordcard(Long wordcardId);


}
