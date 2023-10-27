package com.npc.say_vr.domain.flashcards.api;

import static com.npc.say_vr.domain.flashcards.constant.FlashcardsResponseMessage.SUCCESS_CREATE_DECK;
import static com.npc.say_vr.domain.flashcards.constant.FlashcardsResponseMessage.SUCCESS_READ_DECK_DETAIL;

import com.npc.say_vr.domain.flashcards.dto.FlashcardsRequestDto.CreateFlashcardsRequestDto;
import com.npc.say_vr.domain.flashcards.service.FlashcardsService;
import com.npc.say_vr.global.dto.ResponseDto;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/flashcards")
public class FlashcardsApiController {

    private final FlashcardsService flashcardsService;

    @PostMapping("/deck")
    public ResponseEntity<?> createDeck(@AuthenticationPrincipal Long userId, @RequestBody
    CreateFlashcardsRequestDto requestDto) {
        ResponseDto responseDto = ResponseDto.builder()
            .message(SUCCESS_CREATE_DECK.getMessage())
            .data(flashcardsService.createPersonalDeck(userId, requestDto))
            .build();
        return ResponseEntity.ok(responseDto);
    }

    @PostMapping("/deck/fork/{deckId}")
    public ResponseEntity<?> createForkedDeck(@AuthenticationPrincipal Long userId,
        @PathVariable Long deckId) {
        ResponseDto responseDto = ResponseDto.builder().build();
        return ResponseEntity.ok(responseDto);
    }

    //TODO: 단어장 생성, 단어장 조회(검색) -1 내단어장 -2 공개단어장 -3 태그 내 -4 태그 공개
    //TODO: search, 검색 기반으로 전달받는 정보가 private/ public , search keyword?,
    @GetMapping("/search")
    public ResponseEntity<?> readDecksBySearch(@AuthenticationPrincipal Long userId) {
        ResponseDto responseDto = ResponseDto.builder().build();
        return ResponseEntity.ok(responseDto);
    }

    @GetMapping("/deck/{deckId}")
    public ResponseEntity<?> readOneDeck(@AuthenticationPrincipal Long userId,
        @PathVariable Long deckId) {
        ResponseDto responseDto = ResponseDto.builder()
            .message(SUCCESS_READ_DECK_DETAIL.getMessage())
            .data(flashcardsService.readDeckDetail(userId, deckId))
            .build();
        return ResponseEntity.ok(responseDto);
    }

    @PatchMapping("/saving/{deckId}")
    public ResponseEntity<?> updateDeckSavingStatus(@AuthenticationPrincipal Long userId,
        @PathVariable Long deckId) {
        ResponseDto responseDto = ResponseDto.builder().build();
        return ResponseEntity.ok(responseDto);
    }

    @PatchMapping("/reset-progress/{deckId}")
    public ResponseEntity<?> updateDeckSavingProgress(@AuthenticationPrincipal Long userId,
        @PathVariable Long deckId) {
        ResponseDto responseDto = ResponseDto.builder().build();
        return ResponseEntity.ok(responseDto);
    }

    @PutMapping("/deck/{deckId}")
    public ResponseEntity<?> updateDeck(@AuthenticationPrincipal Long userId,
        @PathVariable Long deckId) {
        ResponseDto responseDto = ResponseDto.builder().build();
        return ResponseEntity.ok(responseDto);
    }

    @DeleteMapping("/deck/{deckId}")
    public ResponseEntity<?> deleteDeck(@AuthenticationPrincipal Long userId,
        @PathVariable Long deckId) {
        ResponseDto responseDto = ResponseDto.builder().build();
        return ResponseEntity.ok(responseDto);
    }


}
