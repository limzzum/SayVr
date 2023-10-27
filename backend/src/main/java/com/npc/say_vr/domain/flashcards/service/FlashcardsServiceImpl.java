package com.npc.say_vr.domain.flashcards.service;

import com.npc.say_vr.domain.flashcards.domain.FlashcardDeck;
import com.npc.say_vr.domain.flashcards.domain.PersonalDeck;
import com.npc.say_vr.domain.flashcards.dto.FlashcardsRequestDto;
import com.npc.say_vr.domain.flashcards.dto.FlashcardsRequestDto.CreateFlashcardsRequestDto;
import com.npc.say_vr.domain.flashcards.dto.FlashcardsRequestDto.SearchRequestDto;
import com.npc.say_vr.domain.flashcards.dto.FlashcardsResponseDto.DeckDetailResponseDto;
import com.npc.say_vr.domain.flashcards.repository.FlashcardsRepository;
import com.npc.say_vr.domain.flashcards.repository.PersonalDeckRepository;
import com.npc.say_vr.domain.user.domain.User;
import com.npc.say_vr.domain.user.repository.UserRepository;
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

    private final FlashcardsRepository flashcardsRepository;
    private final PersonalDeckRepository personalDeckRepository;
    private final UserRepository userRepository;

    @Override
    public DeckDetailResponseDto createPersonalDeck(Long userId,
        CreateFlashcardsRequestDto requestDto) {
        //TODO: 예외 처리 유저 없을때 ->
        FlashcardDeck flashcardDeck = FlashcardDeck.builder().build();
        flashcardDeck = flashcardsRepository.save(flashcardDeck);
        User user = userRepository.findById(userId).orElseThrow();
        PersonalDeck personalDeck = requestDto.createPersonalDeck(user, flashcardDeck);
        personalDeck = personalDeckRepository.save(personalDeck);

        //TODO: 메세지 지원이 한 것 보고 constant에 생성 성공 메세지 & 코드

        return DeckDetailResponseDto.builder().personalDeck(personalDeck).build();
    }

    @Override
    public DeckDetailResponseDto createForkedDeck(Long userId, Long personalDeckId) {
        PersonalDeck deckToFork = personalDeckRepository.findById(personalDeckId).orElseThrow();
        FlashcardDeck forkedWords = FlashcardDeck.builder()
            .wordcards(deckToFork.getFlashcardDeck().getWordcards()).build();
        forkedWords = flashcardsRepository.save(forkedWords);
        User user = userRepository.findById(userId).orElseThrow();
        //TODO: 복사할 내용 뜯어오기
        PersonalDeck personalDeck = PersonalDeck.builder().build();
        personalDeck = personalDeckRepository.save(personalDeck);

        return DeckDetailResponseDto.builder().personalDeck(personalDeck).build();
    }

    @Override
    public ResponseDto readDeckSearch(Long userId, SearchRequestDto searchRequestDto) {
        return null;
    }

    @Override
    public DeckDetailResponseDto readDeckDetail(Long userId, Long deckId) {
        return null;
    }

    @Override
    public ResponseDto updateSavingProgressOption(Long userId, Long deckId,
        FlashcardsRequestDto requestDto) {
        return null;
    }

    @Override
    public DeckDetailResponseDto updateResetProgress(Long userId, Long deckId) {
        return null;
    }

    @Override
    public DeckDetailResponseDto updateDeck(Long userId, Long deckId,
        FlashcardsRequestDto requestDto) {
        return null;
    }

    @Override
    public ResponseDto deleteDeck(Long userId, Long deckId) {
        return null;
    }
}
