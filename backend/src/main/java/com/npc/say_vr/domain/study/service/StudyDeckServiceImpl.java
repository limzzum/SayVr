package com.npc.say_vr.domain.study.service;

import com.npc.say_vr.domain.flashcards.constant.WordcardStatus;
import com.npc.say_vr.domain.flashcards.domain.FlashcardDeck;
import com.npc.say_vr.domain.flashcards.domain.Word;
import com.npc.say_vr.domain.flashcards.domain.Wordcard;
import com.npc.say_vr.domain.flashcards.dto.FlashcardsResponseDto;
import com.npc.say_vr.domain.flashcards.dto.FlashcardsResponseDto.MessageOnlyResponseDto;
import com.npc.say_vr.domain.flashcards.repository.WordRepository;
import com.npc.say_vr.domain.flashcards.repository.WordcardRepository;
import com.npc.say_vr.domain.study.domain.Study;
import com.npc.say_vr.domain.study.domain.StudyDeck;
import com.npc.say_vr.domain.study.domain.StudyMember;
import com.npc.say_vr.domain.study.dto.requestDto.CreateStudytDeckRequestDto;
import com.npc.say_vr.domain.study.dto.requestDto.CreateWordcardRequestDto;
import com.npc.say_vr.domain.study.dto.requestDto.UpdateStudyDeckRequestDto;
import com.npc.say_vr.domain.study.dto.responseDto.FlashcardDto;
import com.npc.say_vr.domain.study.dto.responseDto.StudyDeckDetailResponseDto;
import com.npc.say_vr.domain.study.dto.responseDto.StudyDeckInfo;
import com.npc.say_vr.domain.study.dto.responseDto.StudyDeckOneDetailResponseDto;
import com.npc.say_vr.domain.study.dto.responseDto.WordUpdateResponseDto;
import com.npc.say_vr.domain.study.dto.responseDto.WordcardDto;
import com.npc.say_vr.domain.study.repository.flashcardDeckRepostiory.FlashcardDeckRepostiory;
import com.npc.say_vr.domain.study.repository.studyDeckRepository.StudyDeckRepository;
import com.npc.say_vr.domain.study.repository.studyMemberRepository.StudyMemberRepository;
import com.npc.say_vr.domain.study.repository.studyRepository.StudyRepository;
import com.npc.say_vr.global.constant.Status;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Slf4j
@Service
@RequiredArgsConstructor
@Transactional(readOnly = true)
public class StudyDeckServiceImpl implements StudyDeckService{

    private final StudyRepository studyRepository;
    private final StudyDeckRepository studyDeckRepository;
    private final FlashcardDeckRepostiory flashcardDeckRepostiory;
    // TODO : 종원언니꺼 가져온거니까 나중에 내 도메인에도 만들어야함
    private final WordRepository wordRepository;
    // TODO : 종원언니꺼 가져온거니까 나중에 내 도메인에도 만들어야함
    private final WordcardRepository wordcardRepository;
    private final StudyMemberRepository studyMemberRepository;
    @Transactional
    @Override
    public StudyDeckInfo createStudyDeck(Long userId, Long studyId, CreateStudytDeckRequestDto createStudytDeckRequestDto) {
        FlashcardDeck flashcardDeck = FlashcardDeck.builder().build() ;
        flashcardDeck = flashcardDeckRepostiory.save(flashcardDeck);
        // TODO : 예외처리
        Study study = studyRepository.findById(studyId).orElseThrow();
        StudyDeck studyDeck = createStudytDeckRequestDto.createStudyDeck(study,flashcardDeck);
        studyDeck = studyDeckRepository.save(studyDeck);

        return new StudyDeckInfo(studyDeck);
    }

    @Override
    public StudyDeckDetailResponseDto readStudyDeckList(Long userId, Long studyId) {
        return StudyDeckDetailResponseDto.builder()
                .studyDeckInfoList(studyDeckRepository.findByStudyId(studyId))
                .build();
    }

    @Transactional
    @Override
    public void updateStudyDeck(Long userId, Long studyId, UpdateStudyDeckRequestDto updateStudyDeckRequestDto) {
        // TODO : 예외처리
        StudyDeck studyDeck = studyDeckRepository.findById(updateStudyDeckRequestDto.getStudyDeckId()).orElseThrow();
        studyDeck.updateName(updateStudyDeckRequestDto.getName());
    }

    @Transactional
    @Override
    public MessageOnlyResponseDto deleteStudyDeck(Long userId, Long studyId, Long studyDeckId) {
        StudyDeck studyDeck = studyDeckRepository.findById(studyDeckId).orElseThrow();
        studyDeck.updateStatus(Status.DELETE);
        return new MessageOnlyResponseDto("단어장이 삭제되었습니다");
    }

    @Override
    public StudyDeckOneDetailResponseDto readStudyDeckDetail(Long userId, Long studyId, Long studyDeckId) {
        // TODO : 테스트해보기
        StudyDeckOneDetailResponseDto studyDeckOneDetailResponseDto = studyDeckRepository.findByStudyDeckId(studyDeckId);
        FlashcardDto flashcardDto = FlashcardDto.builder()
                .wordcardList(studyDeckRepository.findWordcardsByFlashcardDeckId(studyDeckOneDetailResponseDto.getFlashcardDeckId()))
                .build();
        // TODO : 예외처리
        StudyMember studyMember = studyMemberRepository.findByUserIdAndStudyIdOnlyStudyMember(userId, studyId).orElseThrow();
        studyDeckOneDetailResponseDto.updateFlashcardDto(flashcardDto,studyMember.getStudyRole());
        return studyDeckOneDetailResponseDto;
    }

    @Transactional
    @Override
    public WordUpdateResponseDto createWordcard(Long userId, Long studyId, Long studyDeckId, CreateWordcardRequestDto createWordcardRequestDto) {
        StudyDeck studyDeck = studyDeckRepository.findById(studyDeckId).orElseThrow();
        FlashcardDeck flashcardDeck = studyDeck.getFlashcardDeck();
        // TODO : DEVELOP 하기
        Word word = wordRepository.findByEnglishAndKorean(createWordcardRequestDto.getEng(), createWordcardRequestDto.getKor());
        Word newWord;
        Wordcard wordcard;

        if (word == null) {
            log.info("when word is null, create new");
            newWord = createWordcardRequestDto.createWord();
            newWord = wordRepository.save(newWord);
            wordcard = createWordcardRequestDto.createWordcard(flashcardDeck, newWord);
            wordcard = wordcardRepository.save(wordcard);

        } else {
            log.info("when word exists check if redundant");
            // DB에 존재하는 단어
            //단어장에 이미 있는지 확인하기
            Wordcard preexist = wordcardRepository.findByFlashcardDeck_IdAndWord_IdAndStatusIsNot(
                    flashcardDeck.getId(), word.getId(), WordcardStatus.DELETED);
            if (preexist != null) {// 이미 단어장에 존재하는 단어->
                log.info("redundant, returning preexisting word");
//                return WordUpdateResponseDto.builder().wordcard(wordcardDto).build();
                return WordUpdateResponseDto.builder().errorMessage("이미 단어장에 존재하는 단어입니다").build();
            } else {
                log.info("add word to deck");
                wordcard = Wordcard.builder().word(word).status(WordcardStatus.UNCHECKED)
                        .flashcardDeck(flashcardDeck).build();
                wordcard = wordcardRepository.save(wordcard);

            }
        }
        WordcardDto wordcardDto = new WordcardDto(wordcard);
        studyDeck.updateWordCount(Math.toIntExact(
            flashcardDeck.getWordcards().stream()
                .filter(wordCard -> wordCard.getStatus() != WordcardStatus.DELETED)
                .count()
        ));
        return WordUpdateResponseDto.builder()
                .wordcard(wordcardDto)
                .build();
    }
    @Transactional
    @Override
    public MessageOnlyResponseDto deleteWordcard(Long userId, Long studyDeckId, Long wordcardId) {
        // TODO : 예외처리
        Wordcard wordcard = wordcardRepository.findById(wordcardId).orElseThrow();

        if (wordcard != null) {
            wordcard.updateStatus(WordcardStatus.DELETED);
            return new MessageOnlyResponseDto("단어가 단어장에서 삭제되었습니다.");
        }
        return new MessageOnlyResponseDto("없는 단어입니다");
    }
}
