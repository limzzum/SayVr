package com.npc.say_vr.domain.flashcards.service;

import com.npc.say_vr.domain.flashcards.constant.FlashcardStatus;
import com.npc.say_vr.domain.flashcards.constant.SavingProgressStatus;
import com.npc.say_vr.domain.flashcards.constant.WordcardStatus;
import com.npc.say_vr.domain.flashcards.domain.FlashcardDeck;
import com.npc.say_vr.domain.flashcards.domain.PersonalDeck;
import com.npc.say_vr.domain.flashcards.domain.Wordcard;
import com.npc.say_vr.domain.flashcards.dto.FlashcardsRequestDto.CreateFlashcardsRequestDto;
import com.npc.say_vr.domain.flashcards.dto.FlashcardsRequestDto.DeckSettingsUpdateRequestDto;
import com.npc.say_vr.domain.flashcards.dto.FlashcardsRequestDto.DeckUpdateRequestDto;
import com.npc.say_vr.domain.flashcards.dto.FlashcardsRequestDto.ReadDeckSearchRequestDto;
import com.npc.say_vr.domain.flashcards.dto.FlashcardsRequestDto.SearchRequestDto;
import com.npc.say_vr.domain.flashcards.dto.FlashcardsResponseDto.DeckCreateResponseDto;
import com.npc.say_vr.domain.flashcards.dto.FlashcardsResponseDto.DeckDetailResponseDto;
import com.npc.say_vr.domain.flashcards.dto.FlashcardsResponseDto.DeckListResponseDto;
import com.npc.say_vr.domain.flashcards.dto.FlashcardsResponseDto.DeckTitleResponseDto;
import com.npc.say_vr.domain.flashcards.dto.FlashcardsResponseDto.MessageOnlyResponseDto;
import com.npc.say_vr.domain.flashcards.repository.FlashcardsRepository;
import com.npc.say_vr.domain.flashcards.repository.PersonalDeckRepository;
import com.npc.say_vr.domain.flashcards.repository.QueryDslFlashcardRepository;
import com.npc.say_vr.domain.flashcards.repository.WordcardRepository;
import com.npc.say_vr.domain.study.repository.flashcardDeckRepostiory.QueryDslFlashcardDeckRepostiory;
import com.npc.say_vr.domain.user.domain.User;
import com.npc.say_vr.domain.user.repository.UserRepository;
import com.npc.say_vr.global.dto.ResponseDto;
import java.util.List;
import java.util.Objects;
import java.util.stream.Collectors;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Slf4j
@Service
@RequiredArgsConstructor
@Transactional(readOnly = true)
public class FlashcardsServiceImpl implements FlashcardsService {

    //TODO 단어상태 리셋시키는 부분 단어 서비스에 넘길까??? 그러면 순환 참조 위험?
    private final FlashcardsRepository flashcardsRepository;
    private final PersonalDeckRepository personalDeckRepository;
    private final WordcardRepository wordcardRepository;
    private final UserRepository userRepository;
    private final QueryDslFlashcardRepository queryDslFlashcardRepository;


    @Override
    public DeckCreateResponseDto createPersonalDeck(Long userId,
        CreateFlashcardsRequestDto requestDto) {
        //TODO: 예외 처리 유저 없을때 ->
        FlashcardDeck flashcardDeck = FlashcardDeck.builder().build();
        flashcardDeck = flashcardsRepository.save(flashcardDeck);
        User user = userRepository.findById(userId).orElseThrow();
        PersonalDeck personalDeck = requestDto.createPersonalDeck(user, flashcardDeck);
        personalDeck.updateSavingProgress(SavingProgressStatus.ENABLED);
        personalDeck = personalDeckRepository.save(personalDeck);

        //TODO: 메세지 지원이 한 것 보고 constant에 생성 성공 메세지 & 코드

        return new DeckCreateResponseDto(personalDeck);
    }

    //TODO: 테스팅 필요!!! 공개 조회시 거르고 조회해야 함
    @Override
    public DeckCreateResponseDto createForkedDeck(Long userId, Long personalDeckId) {
        PersonalDeck deckToFork = personalDeckRepository.findById(personalDeckId).orElseThrow();
        deckToFork.updateForkCount();
        personalDeckRepository.save(deckToFork);
        FlashcardDeck forkedWords = FlashcardDeck.builder()
            .wordcards(deckToFork.getFlashcardDeck().getWordcards())
            .build();
        forkedWords = flashcardsRepository.save(forkedWords);
        User user = userRepository.findById(userId).orElseThrow();
        //TODO: 복사할 내용 뜯어오기
        PersonalDeck personalDeck = PersonalDeck.builder()
            .flashcardDeck(forkedWords)
            .user(user)
            .name(deckToFork.getName())
            .status(FlashcardStatus.FORKED)
            .tags(deckToFork.getTags())
            .build();
        personalDeck = personalDeckRepository.save(personalDeck);

        return new DeckCreateResponseDto(personalDeck);
    }

    @Override
    public DeckListResponseDto readPrivateDecks(Long userId) {
        List<PersonalDeck> personalDeckList = personalDeckRepository.findByUser_IdAndStatusIsNot(
            userId, FlashcardStatus.DELETED);
        log.info("personal deck:{}", personalDeckList);
        return new DeckListResponseDto(personalDeckList);
    }

    @Override
    public DeckListResponseDto readPublicDecks() {
        List<PersonalDeck> personalDeckList = personalDeckRepository.findByStatusIsNotAndStatusIsNotAndStatusIs(
            FlashcardStatus.DELETED, FlashcardStatus.FORKED, FlashcardStatus.PUBLIC);
        return new DeckListResponseDto(personalDeckList);
    }

    //TODO: 조회시 걸러야 할 상황들, 1 삭제여부 2 공개 형태 3 검색조건 4 갯수 5
    @Override
    public DeckListResponseDto readDeckSearch(Long userId, ReadDeckSearchRequestDto readDeckSearchRequestDto) {

        List<PersonalDeck> personalDeckList = queryDslFlashcardRepository.searchAndSortPersonalDecks(readDeckSearchRequestDto);

        return new DeckListResponseDto(personalDeckList);
    }

    @Override
    public DeckDetailResponseDto readDeckDetail(Long userId, Long deckId) {

        PersonalDeck personalDeck = personalDeckRepository.findById(deckId).orElseThrow();
        FlashcardStatus access = personalDeck.getStatus();
        FlashcardDeck flashcardDeck = personalDeck.getFlashcardDeck();
        if ((access.equals(FlashcardStatus.PRIVATE)
            || access.equals(FlashcardStatus.FORKED))
            && !Objects.equals(personalDeck.getUser().getId(), userId)) {
            log.info("private or forked and unauthorized");
            //TODO: 접근 권한 예외 처리
            //            throw new FlashcardsNotFoundException("비공개 단어장 접근 권한 없음");
            return DeckDetailResponseDto.builder().build();
        } else {
            return new DeckDetailResponseDto(personalDeck);
        }
    }

    @Transactional
    @Override
    public DeckDetailResponseDto updateSavingProgressOption(Long userId, Long deckId,
        DeckUpdateRequestDto requestDto) {
        PersonalDeck personalDeck = personalDeckRepository.findById(deckId).orElseThrow();
        if (!personalDeck.getUser().getId().equals(userId)) {
            log.info("not authorized");
//            return new MessageOnlyResponseDto("권한이 없습니다");
        } else {
            personalDeck.updateSavingProgress(requestDto.toEnum());
            personalDeck = personalDeckRepository.save(personalDeck);
        }
        return new DeckDetailResponseDto(personalDeck);
    }

    @Transactional
    @Override
    public DeckDetailResponseDto updateResetProgress(Long userId, Long deckId) {
        PersonalDeck personalDeck = personalDeckRepository.findById(deckId).orElseThrow();
        if (!personalDeck.getUser().getId().equals(userId)) {
            log.info("not authorized");
//            return new MessageOnlyResponseDto("권한이 없습니다");
        } else {
            FlashcardDeck flashcardDeck = personalDeck.getFlashcardDeck();
            //TODO: 학습상태 전부 unchecked로 바꾸기
            List<Wordcard> words = flashcardDeck.getWordcards();
            words = words.stream().map(wordcard -> {
                 if(wordcard.getStatus().equals(WordcardStatus.CHECKED)){
                    wordcard.updateStatus(WordcardStatus.UNCHECKED);
                 }
                    return wordcard;
                })
                .collect(Collectors.toList());
            words = wordcardRepository.saveAll(words);
            flashcardDeck.updateWords(words);
            flashcardDeck = flashcardsRepository.save(flashcardDeck);
            personalDeck.updateFlashcardDeck(flashcardDeck);
            personalDeck = personalDeckRepository.save(personalDeck);
        }
        return new DeckDetailResponseDto(personalDeck);
    }

    @Transactional
    @Override
    public DeckDetailResponseDto updateDeck(Long userId, Long deckId,
        DeckSettingsUpdateRequestDto requestDto) {
        PersonalDeck personalDeck = personalDeckRepository.findById(deckId).orElseThrow();
        if (!personalDeck.getUser().getId().equals(userId)) {
            log.info("not authorized");
//            return new MessageOnlyResponseDto("권한이 없습니다");
        } else {
            personalDeck.updateStatus(requestDto.toEnum());
            personalDeck.updateName(requestDto.getName());
            personalDeck = personalDeckRepository.save(personalDeck);
        }
        return new DeckDetailResponseDto(personalDeck);
    }

    @Transactional
    @Override
    public MessageOnlyResponseDto deleteDeck(Long userId, Long deckId) {
        PersonalDeck personalDeck = personalDeckRepository.findById(deckId).orElseThrow();//TODO 없을때
        if (personalDeck.getUser().getId().equals(userId)) {
            personalDeck.updateStatus(FlashcardStatus.DELETED);
            personalDeckRepository.save(personalDeck);
            return new MessageOnlyResponseDto("단어장이 삭제되었습니다");
        } else {
            return new MessageOnlyResponseDto("권한이 없습니다");
        }
    }
}
