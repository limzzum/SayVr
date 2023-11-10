package com.npc.say_vr.domain.flashcards.service;

import com.npc.say_vr.domain.flashcards.dto.FlashcardsRequestDto.CreateWordcardRequestDto;
import com.npc.say_vr.domain.flashcards.dto.FlashcardsRequestDto.GetTranslationRequestDto;
import com.npc.say_vr.domain.flashcards.dto.FlashcardsRequestDto.WordcardUpdateRequestDto;
import com.npc.say_vr.domain.flashcards.dto.FlashcardsResponseDto.AutoCompleteResponseDto;
import com.npc.say_vr.domain.flashcards.dto.FlashcardsResponseDto.MessageOnlyResponseDto;
import com.npc.say_vr.domain.flashcards.dto.FlashcardsResponseDto.TranslationResponseDto;
import com.npc.say_vr.domain.flashcards.dto.FlashcardsResponseDto.WordUpdateResponseDto;
import java.io.File;
import java.io.FileNotFoundException;
import java.io.IOException;

public interface WordcardService {

    WordUpdateResponseDto createWordcard(Long userId, Long deckId,
        CreateWordcardRequestDto requestDto);

    AutoCompleteResponseDto createTranslation(GetTranslationRequestDto requestDto);

    WordUpdateResponseDto readTodaySentence();

    WordUpdateResponseDto updateWordcard(Long userId, Long wordcardId);

    WordUpdateResponseDto updateLearningProgress(Long userId, Long wordcardId,
        WordcardUpdateRequestDto status);

    MessageOnlyResponseDto deleteWordcard(Long userId, Long wordcardId);

    //TODO: undecided
    WordUpdateResponseDto readWordcard(Long wordcardId);

    void createWordList(Long userId, Long flashcardId, File file) throws IOException;
    public void createWordcards(Long userId, Long deckId, String kor, String eng);
}
