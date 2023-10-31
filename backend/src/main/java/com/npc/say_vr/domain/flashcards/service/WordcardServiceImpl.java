package com.npc.say_vr.domain.flashcards.service;

import com.npc.say_vr.domain.flashcards.constant.WordcardStatus;
import com.npc.say_vr.domain.flashcards.domain.FlashcardDeck;
import com.npc.say_vr.domain.flashcards.domain.PersonalDeck;
import com.npc.say_vr.domain.flashcards.domain.Word;
import com.npc.say_vr.domain.flashcards.domain.Wordcard;
import com.npc.say_vr.domain.flashcards.dto.FlashcardsRequestDto.CreateWordcardRequestDto;
import com.npc.say_vr.domain.flashcards.dto.FlashcardsResponseDto.MessageOnlyResponseDto;
import com.npc.say_vr.domain.flashcards.dto.FlashcardsResponseDto.WordUpdateResponseDto;
import com.npc.say_vr.domain.flashcards.repository.PersonalDeckRepository;
import com.npc.say_vr.domain.flashcards.repository.WordRepository;
import com.npc.say_vr.domain.flashcards.repository.WordcardRepository;
import java.util.List;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Slf4j
@Service
@RequiredArgsConstructor
@Transactional(readOnly = true)
public class WordcardServiceImpl implements WordcardService {

    private final PersonalDeckRepository personalDeckRepository;
    private final WordcardRepository wordcardRepository;
    private final WordRepository wordRepository;

    @Override
    public WordUpdateResponseDto createWordcard(Long userId, Long deckId,
        CreateWordcardRequestDto requestDto) {
        PersonalDeck personalDeck = personalDeckRepository.findById(deckId).orElseThrow();
        FlashcardDeck flashcardDeck = personalDeck.getFlashcardDeck();
        // TODO 이미 있는 단어인지 확인

        List<Wordcard> words = flashcardDeck.getWordcards();
        Word word = wordRepository.findByEnglishAndKorean(requestDto.getEng(), requestDto.getKor());
        Word newWord;
        Wordcard wordcard;
        if (word == null) {
            newWord = Word.builder()
                .korean(requestDto.getKor())
                .english(requestDto.getEng())
                .build();
            newWord = wordRepository.save(newWord);
            wordcard = Wordcard.builder().word(newWord).status(WordcardStatus.UNCHECKED)
                .flashcardDeck(flashcardDeck).build();
            wordcard = wordcardRepository.save(wordcard);
        } else {
            // DB에 존재하는 단어
            //단어장에 이미 있는지 확인하기
            Wordcard preexist = wordcardRepository.findByFlashcardDeck_IdAndWord_Id(
                flashcardDeck.getId(), word.getId());
            if (preexist != null) {// 이미 단어장에 존재하는 단어->
                return WordUpdateResponseDto.builder().wordcard(preexist).build();
            } else {
                wordcard = Wordcard.builder().word(word).status(WordcardStatus.UNCHECKED)
                    .flashcardDeck(flashcardDeck).build();
                wordcard = wordcardRepository.save(wordcard);
            }
        }

        return WordUpdateResponseDto.builder()
            .wordcard(wordcard)
            .build();
    }

    @Override
    public WordUpdateResponseDto readTodaySentence() {
        return WordUpdateResponseDto.builder().build();
    }

    //TODO 무슨 용도 였는지 잊음, 단어 자체를 수정할 일은 없음,, 수정버튼이 없어
    @Override
    public WordUpdateResponseDto updateWordcard(Long userId, Long wordcardId) {
        return WordUpdateResponseDto.builder().build();
    }

    @Override
    public WordUpdateResponseDto updateLearningProgress(Long userId, Long wordcardId,
        String status) {
        Wordcard wordcard = wordcardRepository.findById(wordcardId).orElseThrow();
        wordcard.updateStatus(WordcardStatus.valueOf(status));
        wordcard = wordcardRepository.save(wordcard);
        return WordUpdateResponseDto.builder().wordcard(wordcard).build();
    }

    @Override
    public MessageOnlyResponseDto deleteWordcard(Long userId, Long wordcardId) {
        Wordcard wordcard = wordcardRepository.findById(wordcardId).orElseThrow();

        if (wordcard != null) {
            wordcardRepository.delete(wordcard);
            return new MessageOnlyResponseDto("단어가 단어장에서 삭제되었습니다.");
        }
        return new MessageOnlyResponseDto("없는 단어입니다");

    }

    @Override
    public WordUpdateResponseDto readWordcard(Long wordcardId) {
        Wordcard wordcard = wordcardRepository.findById(wordcardId).orElseThrow();
        return WordUpdateResponseDto.builder()
            .wordcard(wordcard).build();
    }
}
