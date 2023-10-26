package com.npc.say_vr.domain.flashcards.service;

import com.npc.say_vr.domain.flashcards.domain.Wordcard;
import com.npc.say_vr.global.dto.ResponseDto;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Slf4j
@Service
@RequiredArgsConstructor
@Transactional(readOnly = true)
public class WordcardServiceImpl implements WordcardService {


    @Override
    public ResponseDto createWordcard(Long userId, Long deckId) {
        return null;
    }

    @Override
    public Wordcard readTodaySentence() {
        return null;
    }

    @Override
    public ResponseDto updateWordcard(Long userId, Long wordcardId) {
        return null;
    }

    @Override
    public ResponseDto updateLearningProgress(Long userId, Long wordcardId) {
        return null;
    }

    @Override
    public ResponseDto deleteWordcard(Long userId, Long deckId) {
        return null;
    }
}
