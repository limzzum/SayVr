package com.npc.say_vr.domain.flashcards.service;

import com.npc.say_vr.domain.flashcards.constant.WordcardStatus;
import com.npc.say_vr.domain.flashcards.domain.FlashcardDeck;
import com.npc.say_vr.domain.flashcards.domain.PersonalDeck;
import com.npc.say_vr.domain.flashcards.domain.Word;
import com.npc.say_vr.domain.flashcards.domain.Wordcard;
import com.npc.say_vr.domain.flashcards.dto.FlashcardsRequestDto.CreateWordcardRequestDto;
import com.npc.say_vr.domain.flashcards.dto.FlashcardsRequestDto.GetTranslationRequestDto;
import com.npc.say_vr.domain.flashcards.dto.FlashcardsRequestDto.WordcardUpdateRequestDto;
import com.npc.say_vr.domain.flashcards.dto.FlashcardsResponseDto.AutoCompleteResponseDto;
import com.npc.say_vr.domain.flashcards.dto.FlashcardsResponseDto.MessageOnlyResponseDto;
import com.npc.say_vr.domain.flashcards.dto.FlashcardsResponseDto.WordUpdateResponseDto;
import com.npc.say_vr.domain.flashcards.dto.TranslationResponseDto;
import com.npc.say_vr.domain.flashcards.repository.PersonalDeckRepository;
import com.npc.say_vr.domain.flashcards.repository.WordRepository;
import com.npc.say_vr.domain.flashcards.repository.WordcardRepository;
import java.io.BufferedReader;
import java.io.File;
import java.io.FileNotFoundException;
import java.io.FileReader;
import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Paths;
import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.client.RestTemplate;

@Slf4j
@Service
@RequiredArgsConstructor
@Transactional(readOnly = true)
public class WordcardServiceImpl implements WordcardService {

    private final PersonalDeckRepository personalDeckRepository;
    private final WordcardRepository wordcardRepository;
    private final WordRepository wordRepository;
    private final RestTemplate restTemplate;

    @Value("${spring.translate.url}")
    private String papagoUrl;
    @Value("${spring.translate.naver.client.id}")
    private String naverApiClientId;
    @Value("${spring.translate.naver.client.secret}")
    private String naverApiClientSecret;

    @Transactional
    @Override
    public WordUpdateResponseDto createWordcard(Long userId, Long deckId,
        CreateWordcardRequestDto requestDto) {
        PersonalDeck personalDeck = personalDeckRepository.findById(deckId).orElseThrow();
        FlashcardDeck flashcardDeck = personalDeck.getFlashcardDeck();
        log.info("get deck to add::{}", personalDeck);
        // TODO 이미 있는 단어인지 확인
        Word word = wordRepository.findByEnglishAndKorean(requestDto.getEng(), requestDto.getKor());
        log.info("word is null or exist:{}", word);
        Word newWord;
        Wordcard wordcard;

        if (word == null) {
            log.info("when word is null, create new");
            newWord = requestDto.createWord();
            newWord = wordRepository.save(newWord);
            wordcard = requestDto.createWordcard(flashcardDeck, newWord);
            wordcard = wordcardRepository.save(wordcard);

        } else {
            log.info("when word exists check if redundant");
            // DB에 존재하는 단어
            //단어장에 이미 있는지 확인하기
            Wordcard preexist = wordcardRepository.findByFlashcardDeck_IdAndWord_IdAndStatusIsNot(
                flashcardDeck.getId(), word.getId(), WordcardStatus.DELETED);
            if (preexist != null) {// 이미 단어장에 존재하는 단어->
                log.info("redundant, returning preexisting word");
//                return WordUpdateResponseDto.builder().wordcard(preexist).build();
                return new WordUpdateResponseDto("이미 단어장에 존재하는 단어입니다");
            } else {
                log.info("add word to deck");
                wordcard = Wordcard.builder().word(word).status(WordcardStatus.UNCHECKED)
                    .flashcardDeck(flashcardDeck).build();
                wordcard = wordcardRepository.save(wordcard);

            }
        }
        //TODO 개수 바뀔까?
        personalDeck.updateWordCount(Math.toIntExact(
            flashcardDeck.getWordcards().stream()
                .filter(wordCard -> wordCard.getStatus() != WordcardStatus.DELETED)
                .count()
        ));
        personalDeck = personalDeckRepository.save(personalDeck);
        return WordUpdateResponseDto.builder()
            .wordcard(wordcard)
            .build();
    }

    @Override
    public AutoCompleteResponseDto createTranslation(GetTranslationRequestDto requestDto) {
        String apiUrl = papagoUrl + "/v1/papago/n2mt";
        HttpHeaders headers = new HttpHeaders();
        headers.set("X-Naver-Client-Id", naverApiClientId);
        headers.set("X-Naver-Client-Secret", naverApiClientSecret);
        headers.setContentType(MediaType.APPLICATION_FORM_URLENCODED);

        String postParams =
            "source=" + requestDto.getSource() + "&target=" + requestDto.getTarget() + "&text="
                + requestDto.getText();
        List<Word> dbList = new ArrayList<>();
        if(requestDto.getSource().equals("en")){
            dbList = wordRepository.findByEnglishIgnoreCase(requestDto.getText());

        } else if (requestDto.getSource().equals("ko")) {
            dbList = wordRepository.findByKoreanIgnoreCase(requestDto.getText());
        }
        String result="초기값";
        HttpEntity<String> entity = new HttpEntity<>(postParams, headers);
        ResponseEntity<TranslationResponseDto> response = restTemplate.postForEntity(apiUrl, entity, TranslationResponseDto.class);
        if (response.getStatusCode() == HttpStatus.OK) {
            result = response.getBody().getMessage().getResult().getTranslatedText();
        } else {
            throw new RuntimeException(
                "Translation request failed with status code: " + response.getStatusCode());
        }
        return new AutoCompleteResponseDto(dbList, requestDto.getTarget(), result);
    }

    //TODO 서버 실행시 단어셋 DB 저장 시킬것
    @Override
    public WordUpdateResponseDto readTodaySentence() {
        Long wordcardId = wordcardRepository.findRandomWordcardIdByDeckId(5L, LocalDate.now().toEpochDay());
//        Long wordcardId = wordcardRepository.findRandomWordcardIdByDeckId(5L, 18930L);

        Wordcard sentence = wordcardRepository.findById(wordcardId).orElse(Wordcard.builder().word(wordRepository.findById(3488L).orElseThrow()).build());
        //TODO 없을 때 예외처리
//        String errorMessage ="UNAVAILABLE";

        return WordUpdateResponseDto.builder()
            .wordcard(sentence)
            .build();
    }

    //TODO 무슨 용도 였는지 잊음, 단어 자체를 수정할 일은 없음,, 수정버튼이 없어
    @Override
    public WordUpdateResponseDto updateWordcard(Long userId, Long wordcardId) {
        return WordUpdateResponseDto.builder().build();
    }

    @Transactional
    @Override
    public WordUpdateResponseDto updateLearningProgress(Long userId, Long wordcardId,
        WordcardUpdateRequestDto requestDto) {
        Wordcard wordcard = wordcardRepository.findById(wordcardId).orElseThrow();
        //TODO: enum 값 잘못 올 때
        wordcard.updateStatus(requestDto.toEnum());
        wordcard = wordcardRepository.save(wordcard);
        return WordUpdateResponseDto.builder().wordcard(wordcard).build();
    }

    @Transactional
    @Override
    public MessageOnlyResponseDto deleteWordcard(Long userId, Long wordcardId) {
        Wordcard wordcard = wordcardRepository.findById(wordcardId).orElseThrow();
        FlashcardDeck flashcardDeck = wordcard.getFlashcardDeck();
        PersonalDeck personalDeck = flashcardDeck.getPersonalDeck();
        if (wordcard != null) {
            wordcard.updateStatus(WordcardStatus.DELETED);
            personalDeck.updateWordCount(Math.toIntExact(
                flashcardDeck.getWordcards().stream()
                    .filter(wordCard -> wordCard.getStatus() != WordcardStatus.DELETED)
                    .count()
            ));
            wordcardRepository.save(wordcard);
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

    // TODO : 성능 개선 & 비동기적 처리 & 예외처리
    @Transactional
    @Override
    public void createWordList(Long userId, Long flashcardId, BufferedReader br) throws IOException {
        String line;
        if ((line = br.readLine()) != null) {
            while ((line = br.readLine()) != null) {
                String[] datalines = line.split(",");
                try {
                    String kor = datalines[0].replace("\"", "").trim();
                    String eng = datalines[1].replace("\"", "").trim();


                    createWordcards(userId, flashcardId, kor, eng);
                } catch (NumberFormatException e) {
                    continue;  // 첫번째 줄(제목 행) 제외하기 위함
                }
            }
            br.close();
        }
    }
    @Transactional
    @Override
    public void createWordcards(Long userId, Long deckId, String kor, String eng) {
        PersonalDeck personalDeck = personalDeckRepository.findById(deckId).orElseThrow();
        FlashcardDeck flashcardDeck = personalDeck.getFlashcardDeck();
        log.info("get deck to add::{}", personalDeck);
        // TODO 이미 있는 단어인지 확인
        Word word = wordRepository.findByEnglishAndKorean(eng, kor);
        log.info("word is null or exist:{}", word);
        Word newWord;
        Wordcard wordcard;

        if (word == null) {
            log.info("when word is null, create new");
            newWord = Word.builder()
                        .english(eng)
                        .korean(kor)
                        .build();
            newWord = wordRepository.save(newWord);
            wordcard = Wordcard.builder()
                        .flashcardDeck(flashcardDeck)
                        .status(WordcardStatus.UNCHECKED)
                        .word(newWord)
                        .build();
            wordcard = wordcardRepository.save(wordcard);

        } else {
            log.info("when word exists check if redundant");
            // DB에 존재하는 단어
            //단어장에 이미 있는지 확인하기
            Wordcard preexist = wordcardRepository.findByFlashcardDeck_IdAndWord_IdAndStatusIsNot(
                flashcardDeck.getId(), word.getId(), WordcardStatus.DELETED);
            if (preexist != null) {// 이미 단어장에 존재하는 단어->
                log.info("redundant, returning preexisting word");
                return;
            } else {
                log.info("add word to deck");
                wordcard = Wordcard.builder().word(word).status(WordcardStatus.UNCHECKED)
                    .flashcardDeck(flashcardDeck).build();
                wordcard = wordcardRepository.save(wordcard);

            }
        }
        int count = personalDeck.getWordCount();
        personalDeck.updateWordCount(count+1);
        personalDeckRepository.save(personalDeck);
    }


}
