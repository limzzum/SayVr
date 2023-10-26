package com.npc.say_vr.domain.flashcards.service;

import com.npc.say_vr.domain.flashcards.domain.PersonalDeck;
import com.npc.say_vr.domain.flashcards.dto.FlashcardsRequestDto;
import com.npc.say_vr.global.dto.ResponseDto;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Slf4j
@Service
@RequiredArgsConstructor
@Transactional(readOnly = true)
public class FlashcardsServiceImpl implements FlashcardsService {


    @Override
    public ResponseDto createPersonalDeck(Long userId, Long deckId,
        FlashcardsRequestDto requestDto) {
        return null;
    }

    @Override
    public ResponseDto createForkedDeck(Long userId, Long deckId) {
        return null;
    }

    @Override
    public PersonalDeck readDeckDetail(Long userId, Long deckId) {
        return null;
    }

    @Override
    public ResponseDto updateSavingProgressOption(Long userId, Long deckId,
        FlashcardsRequestDto requestDto) {
        return null;
    }

    @Override
    public ResponseDto updateResetProgress(Long userId, Long deckId) {
        return null;
    }

    @Override
    public ResponseDto updateDeck(Long userId, Long deckId, FlashcardsRequestDto requestDto) {
        return null;
    }

    @Override
    public ResponseDto deleteDeck(Long userId, Long deckId) {
        return null;
    }
}
