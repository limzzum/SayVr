package com.npc.say_vr.domain.flashcards.service;

import com.npc.say_vr.domain.flashcards.domain.Wordcard;
import com.npc.say_vr.global.dto.ResponseDto;

public interface WordcardService {

    ResponseDto createWordcard(Long userId, Long deckId);

    //TODO: would reading one card at a time be needed
    //    PersonalDeck readDeckDetail(Long userId, Long deckId);

    Wordcard readTodaySentence();

    ResponseDto updateWordcard(Long userId, Long wordcardId);

    ResponseDto updateLearningProgress(Long userId, Long wordcardId);

    ResponseDto deleteWordcard(Long userId, Long deckId);

    //TODO: undecided
    //    ResponseDto readWordcardVoice(Long wordcardId);


}
