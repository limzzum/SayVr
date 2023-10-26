package com.npc.say_vr.domain.flashcards.api;

import com.npc.say_vr.global.dto.ResponseDto;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/flashcards")
public class FlashcardsApiController {
    // 단어장 생성, 단어장 조회(검색) -1 내단어장 -2 공개단어장 -3 태그 내 -4 태그 공개
    // 단어장 상세 조회
    // 단어장 설정 수정
    // 단어장 삭제
    // 단어장에 단어 추가
    // 단어장 단어 수정 -> 학습상태 수정? put patch

    // 단어장 단어 삭제

    @PostMapping("/deck")
    public ResponseEntity<?> createDeck(@AuthenticationPrincipal Long userId) {
        ResponseDto responseDto;
        return new ResponseEntity<>(responseDto, HttpStatus.OK);
    }

    @PostMapping("/deck/fork/{deckId}")
    public ResponseEntity<?> createForkedDeck(@AuthenticationPrincipal Long userId,
        @PathVariable Long deckId) {
        ResponseDto responseDto;
        return new ResponseEntity<>(responseDto, HttpStatus.OK);
    }


    //TODO: search, 검색 기반으로 전달받는 정보가 private/ public , search keyword?,
    @GetMapping("/search")
    public ResponseEntity<?> readDecksBySearch(@AuthenticationPrincipal Long userId) {
        ResponseDto responseDto;
        return new ResponseEntity<>(responseDto, HttpStatus.OK);
    }

    @GetMapping("/deck/{deckId}")
    public ResponseEntity<?> readOneDeck(@AuthenticationPrincipal Long userId,
        @PathVariable Long deckId) {
        ResponseDto responseDto;
        return new ResponseEntity<>(responseDto, HttpStatus.OK);
    }

    @GetMapping("/today")
    public ResponseEntity<?> readTodaySentence() {
        ResponseDto responseDto;
        return new ResponseEntity<>(responseDto, HttpStatus.OK);
    }

    @PatchMapping("/saving/{deckId}")
    public ResponseEntity<?> updateDeckSavingStatus(@AuthenticationPrincipal Long userId,
        @PathVariable Long deckId) {
        ResponseDto responseDto;
        return new ResponseEntity<>(responseDto, HttpStatus.OK);
    }

    @PatchMapping("/reset-progress/{deckId}")
    public ResponseEntity<?> updateDeckSavingProgress(@AuthenticationPrincipal Long userId,
        @PathVariable Long deckId) {
        ResponseDto responseDto;
        return new ResponseEntity<>(responseDto, HttpStatus.OK);
    }

    @PutMapping("/deck/{deckId}")
    public ResponseEntity<?> updateDeck(@AuthenticationPrincipal Long userId,
        @PathVariable Long deckId) {
        ResponseDto responseDto;
        return new ResponseEntity<>(responseDto, HttpStatus.OK);
    }

    @DeleteMapping("/deck/{deckId}")
    public ResponseEntity<?> deleteDeck(@AuthenticationPrincipal Long userId,
        @PathVariable Long deckId) {
        ResponseDto responseDto;
        return new ResponseEntity<>(responseDto, HttpStatus.OK);
    }

    //TODO : 단어장 단어 추가
    @PostMapping("/card/{deckId}")
    public ResponseEntity<?> createCard(@AuthenticationPrincipal Long userId,
        @PathVariable Long deckId) {
        ResponseDto responseDto;
        return new ResponseEntity<>(responseDto, HttpStatus.OK);
    }

    //TODO: 퀴즈에 쓰기 쉽게 답을 제외한 선택지 세개씩 뽑아서 주는 것
    @PutMapping("/card/{wordcardId}")
    public ResponseEntity<?> updateWordcard(@AuthenticationPrincipal Long userId,
        @PathVariable Long wordcardId) {
        ResponseDto responseDto;
        return new ResponseEntity<>(responseDto, HttpStatus.OK);
    }

    @PatchMapping("/progress/{wordcardId}")
    public ResponseEntity<?> updateCardProgress(@AuthenticationPrincipal Long userId,
        @PathVariable Long wordcardId) {
        ResponseDto responseDto;
        return new ResponseEntity<>(responseDto, HttpStatus.OK);
    }

    @DeleteMapping("/card/{wordcardId}")
    public ResponseEntity<?> deleteCard(@AuthenticationPrincipal Long userId,
        @PathVariable Long wordcardId) {
        ResponseDto responseDto;
        return new ResponseEntity<>(responseDto, HttpStatus.OK);
    }

    @GetMapping("/tts/{wordcardId}")
    public ResponseEntity<?> readWordVoice(@PathVariable Long wordcardId) {
        ResponseDto responseDto;
        return new ResponseEntity<>(responseDto, HttpStatus.OK);
    }

}
