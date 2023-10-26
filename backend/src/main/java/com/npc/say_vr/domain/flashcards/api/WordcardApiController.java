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
public class WordcardApiController {

    @GetMapping("/today")
    public ResponseEntity<?> readTodaySentence() {
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
