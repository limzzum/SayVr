package com.npc.say_vr.domain.flashcards.api;

import static com.npc.say_vr.domain.flashcards.constant.FlashcardsResponseMessage.SUCCESS_CREATE_TRANSLATION;
import static com.npc.say_vr.domain.flashcards.constant.FlashcardsResponseMessage.SUCCESS_CREATE_WORD;
import static com.npc.say_vr.domain.flashcards.constant.FlashcardsResponseMessage.SUCCESS_DELETE_WORDCARD;
import static com.npc.say_vr.domain.flashcards.constant.FlashcardsResponseMessage.SUCCESS_READ_TODAY_SENTENCE;
import static com.npc.say_vr.domain.flashcards.constant.FlashcardsResponseMessage.SUCCESS_READ_WORD;
import static com.npc.say_vr.domain.flashcards.constant.FlashcardsResponseMessage.SUCCESS_UPDATE_LEARNING_STATUS;
import static com.npc.say_vr.domain.flashcards.constant.FlashcardsResponseMessage.SUCCESS_UPDATE_WORDCARD;

import com.npc.say_vr.domain.flashcards.dto.FlashcardsRequestDto.CreateWordcardRequestDto;
import com.npc.say_vr.domain.flashcards.dto.FlashcardsRequestDto.GetTranslationRequestDto;
import com.npc.say_vr.domain.flashcards.dto.FlashcardsRequestDto.WordcardUpdateRequestDto;
import com.npc.say_vr.domain.flashcards.service.WordcardService;
import com.npc.say_vr.global.dto.ResponseDto;
import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStream;
import java.io.InputStreamReader;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestPart;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

@CrossOrigin("*")
@RestController
@RequiredArgsConstructor
@RequestMapping("/api/flashcards")
public class WordcardApiController {

    private final WordcardService wordcardService;

    @PostMapping("/translate")
    public ResponseEntity<?> createTranslate(@RequestBody GetTranslationRequestDto requestDto) {
        ResponseDto responseDto = ResponseDto.builder()
            .message(SUCCESS_CREATE_TRANSLATION.getMessage())
            .httpStatus(SUCCESS_CREATE_TRANSLATION.getHttpStatus())
            .data(wordcardService.createTranslation(requestDto))
            .build();
        return ResponseEntity.ok(responseDto);
    }

    @GetMapping("/today")
    public ResponseEntity<?> readTodaySentence() {
        ResponseDto responseDto = ResponseDto.builder()
            .message(SUCCESS_READ_TODAY_SENTENCE.getMessage())
            .httpStatus(SUCCESS_READ_TODAY_SENTENCE.getHttpStatus())
            .data(wordcardService.readTodaySentence())
            .build();
        return ResponseEntity.ok(responseDto);
    }

    @GetMapping("/random")
    public ResponseEntity<?> readRandomWord() {
        ResponseDto responseDto = ResponseDto.builder()
            .message(SUCCESS_READ_TODAY_SENTENCE.getMessage())
            .httpStatus(SUCCESS_READ_TODAY_SENTENCE.getHttpStatus())
            .data(wordcardService.readRandomWord())
            .build();
        return ResponseEntity.ok(responseDto);
    }

    //TODO : 단어장 단어 추가
    @PostMapping("/card/{deckId}")
    public ResponseEntity<?> createCard(@AuthenticationPrincipal Long userId,
        @PathVariable Long deckId, @RequestBody CreateWordcardRequestDto requestDto) {
        ResponseDto responseDto = ResponseDto.builder()
            .message(SUCCESS_CREATE_WORD.getMessage())
            .httpStatus(SUCCESS_CREATE_WORD.getHttpStatus())
            .data(wordcardService.createWordcard(userId, deckId, requestDto))
            .build();
        return ResponseEntity.ok(responseDto);
    }

    //TODO: 퀴즈에 쓰기 쉽게 답을 제외한 선택지 세개씩 뽑아서 주는 것

    //TODO:이 걸 만 든 이유??
    @PutMapping("/card/{wordcardId}")
    public ResponseEntity<?> updateWordcard(@AuthenticationPrincipal Long userId,
        @PathVariable Long wordcardId) {
        ResponseDto responseDto = ResponseDto.builder()
            .message(SUCCESS_UPDATE_WORDCARD.getMessage())
            .httpStatus(SUCCESS_UPDATE_WORDCARD.getHttpStatus())
            .data(wordcardService.updateWordcard(userId, wordcardId))
            .build();
        return ResponseEntity.ok(responseDto);
    }

    @PatchMapping("/progress/{wordcardId}")
    public ResponseEntity<?> updateCardProgress(@AuthenticationPrincipal Long userId,
        @PathVariable Long wordcardId, @RequestBody WordcardUpdateRequestDto requestDto) {
        ResponseDto responseDto = ResponseDto.builder()
            .message(SUCCESS_UPDATE_LEARNING_STATUS.getMessage())
            .httpStatus(SUCCESS_UPDATE_LEARNING_STATUS.getHttpStatus())
            .data(wordcardService.updateLearningProgress(userId, wordcardId, requestDto))
            .build();
        return ResponseEntity.ok(responseDto);
    }

    @DeleteMapping("/card/{wordcardId}")
    public ResponseEntity<?> deleteCard(@AuthenticationPrincipal Long userId,
        @PathVariable Long wordcardId) {
        ResponseDto responseDto = ResponseDto.builder()
            .message(SUCCESS_DELETE_WORDCARD.getMessage())
            .httpStatus(SUCCESS_DELETE_WORDCARD.getHttpStatus())
            .data(wordcardService.deleteWordcard(userId, wordcardId))
            .build();
        return ResponseEntity.ok(responseDto);
    }

    //TODO:이 걸 만 든 이유??
    @GetMapping("/tts/{wordcardId}")
    public ResponseEntity<?> readWordVoice(@PathVariable Long wordcardId) {
        ResponseDto responseDto = ResponseDto.builder()
            .message(SUCCESS_READ_WORD.getMessage())
            .httpStatus(SUCCESS_READ_WORD.getHttpStatus())
            .data(wordcardService.readWordcard(wordcardId))
            .build();
        return ResponseEntity.ok(responseDto);
    }

    @PostMapping("/csvWords/{flashcardId}")
    public ResponseEntity<?> insertUserData(@AuthenticationPrincipal Long userId,
        @PathVariable Long flashcardId, @RequestPart(required = false) MultipartFile file)
        throws IOException {

        if (file != null) {
            InputStream is = file.getInputStream();
            InputStreamReader isr = new InputStreamReader(is);
            BufferedReader br = new BufferedReader(isr);

            wordcardService.createWordList(userId, flashcardId, br);
        }

        ResponseDto responseDto = ResponseDto.builder()
            .message(SUCCESS_READ_WORD.getMessage())
            .httpStatus(SUCCESS_READ_WORD.getHttpStatus())
            .build();
        return ResponseEntity.ok(responseDto);
    }

}
