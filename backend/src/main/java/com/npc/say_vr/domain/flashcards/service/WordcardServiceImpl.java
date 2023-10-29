package com.npc.say_vr.domain.flashcards.service;

import com.npc.say_vr.domain.flashcards.dto.FlashcardsResponseDto.WordUpdateResponseDto;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Slf4j
@Service
@RequiredArgsConstructor
@Transactional(readOnly = true)
public class WordcardServiceImpl implements WordcardService {

//    private final WordcardRepository wordcardRepository;

    @Override
    public WordUpdateResponseDto createWordcard(Long userId, Long deckId) {
//        PersonalDeck personalDeck = personalDeckRepository.findById(deckId).orElseThrow();
//        FlashcardDeck flashcardDeck = personalDeck.getFlashcardDeck();
//        if (Objects.equals(personalDeck.getUser().getId(), userId)) {

//        }
        return WordUpdateResponseDto.builder().build();
    }

    @Override
    public WordUpdateResponseDto readTodaySentence() {
        return WordUpdateResponseDto.builder().build();
    }

    @Override
    public WordUpdateResponseDto updateWordcard(Long userId, Long wordcardId) {
        return WordUpdateResponseDto.builder().build();
    }

    @Override
    public WordUpdateResponseDto updateLearningProgress(Long userId, Long wordcardId) {
        return WordUpdateResponseDto.builder().build();
    }

    @Override
    public WordUpdateResponseDto deleteWordcard(Long userId, Long deckId) {
        return WordUpdateResponseDto.builder().build();
    }

    @Override
    public WordUpdateResponseDto readWordcard(Long wordcardId) {
        return WordUpdateResponseDto.builder().build();
    }
}
