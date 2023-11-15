package com.npc.say_vr.domain.study.api;

import static com.npc.say_vr.domain.study.constant.StudyResponseMessage.STUDYDECK_CREATE_SUCCESS;
import static com.npc.say_vr.domain.study.constant.StudyResponseMessage.STUDYDECK_READ_SUCCESS;
import static com.npc.say_vr.domain.study.constant.StudyResponseMessage.STUDYDECK_UPDATE_SUCCESS;
import static com.npc.say_vr.domain.study.constant.StudyResponseMessage.STUDYDECK_DELETE_SUCCESS;
import static com.npc.say_vr.domain.study.constant.StudyResponseMessage.STUDYDECKDETAIL_READ_SUCCESS;
import static com.npc.say_vr.domain.study.constant.StudyResponseMessage.STUDYWORDCARD_CREATE_SUCCESS;
import static com.npc.say_vr.domain.study.constant.StudyResponseMessage.STUDYWORDCARD_DELETE_SUCCESS;
import com.npc.say_vr.domain.study.dto.requestDto.CreateStudytDeckRequestDto;
import com.npc.say_vr.domain.study.dto.requestDto.CreateWordcardRequestDto;
import com.npc.say_vr.domain.study.dto.requestDto.UpdateStudyDeckRequestDto;
import com.npc.say_vr.domain.study.service.StudyDeckService;
import com.npc.say_vr.global.dto.ResponseDto;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/study/wordlist")
public class StudyDeckApiController {

    private final StudyDeckService studyDeckService;

    @PostMapping("/{studyId}")
    public ResponseEntity<?> createStudyDeck(@AuthenticationPrincipal Long userId,@PathVariable Long studyId, @RequestBody CreateStudytDeckRequestDto createStudytDeckRequestDto) {
        ResponseDto responseDto = ResponseDto.builder()
                .message(STUDYDECK_CREATE_SUCCESS.getMessage())
                .data(studyDeckService.createStudyDeck(userId,studyId,createStudytDeckRequestDto))
                .httpStatus(STUDYDECK_CREATE_SUCCESS.getHttpStatus())
                .build();

        return ResponseEntity.ok(responseDto);
    }

    @GetMapping("/{studyId}")
    public ResponseEntity<?> readStudyDeckList(@AuthenticationPrincipal Long userId,@PathVariable Long studyId) {
        ResponseDto responseDto = ResponseDto.builder()
                .message(STUDYDECK_READ_SUCCESS.getMessage())
                .data(studyDeckService.readStudyDeckList(userId,studyId))
                .httpStatus(STUDYDECK_READ_SUCCESS.getHttpStatus())
                .build();

        return ResponseEntity.ok(responseDto);
    }
    @PatchMapping("/{studyId}")
    public ResponseEntity<?> updateStudyDeck(@AuthenticationPrincipal Long userId,@PathVariable Long studyId, @RequestBody UpdateStudyDeckRequestDto updateStudyDeckRequestDto) {
        studyDeckService.updateStudyDeck(userId,studyId,updateStudyDeckRequestDto);
        ResponseDto responseDto = ResponseDto.builder()
                .message(STUDYDECK_UPDATE_SUCCESS.getMessage())
                .data(studyDeckService.readStudyDeckDetail(userId,studyId,
                    updateStudyDeckRequestDto.getStudyDeckId()))
                .httpStatus(STUDYDECK_UPDATE_SUCCESS.getHttpStatus())
                .build();

        return ResponseEntity.ok(responseDto);
    }

    @DeleteMapping("/{studyId}/{studyDeckId}")
    public ResponseEntity<?> deleteStudyDeck(@AuthenticationPrincipal Long userId,@PathVariable Long studyId, @PathVariable Long studyDeckId) {
        ResponseDto responseDto = ResponseDto.builder()
                .message(STUDYDECK_DELETE_SUCCESS.getMessage())
                .data(studyDeckService.deleteStudyDeck(userId,studyId,studyDeckId))
                .httpStatus(STUDYDECK_DELETE_SUCCESS.getHttpStatus())
                .build();

        return ResponseEntity.ok(responseDto);
    }

    @GetMapping("/{studyId}/{studyDeckId}")
    public ResponseEntity<?> readStudyDeckDetail(@AuthenticationPrincipal Long userId,@PathVariable Long studyId,@PathVariable Long studyDeckId) {
        ResponseDto responseDto = ResponseDto.builder()
                .message(STUDYDECKDETAIL_READ_SUCCESS.getMessage())
                .data(studyDeckService.readStudyDeckDetail(userId,studyId,studyDeckId))
                .httpStatus(STUDYDECKDETAIL_READ_SUCCESS.getHttpStatus())
                .build();

        return ResponseEntity.ok(responseDto);
    }

    @PostMapping("/{studyId}/{studyDeckId}")
    public ResponseEntity<?> createCard(@AuthenticationPrincipal Long userId,@PathVariable Long studyId, @PathVariable Long studyDeckId, @RequestBody
                                        CreateWordcardRequestDto createWordcardRequestDto) {
        ResponseDto responseDto = ResponseDto.builder()
                .message(STUDYWORDCARD_CREATE_SUCCESS.getMessage())
                .data(studyDeckService.createWordcard(userId,studyId,studyDeckId,createWordcardRequestDto))
                .httpStatus(STUDYWORDCARD_CREATE_SUCCESS.getHttpStatus())
                .build();

        return ResponseEntity.ok(responseDto);
    }

    @DeleteMapping("/{studyId}/{studyDeckId}/{wordcardId}")
    public ResponseEntity<?> deleteWordcard(@AuthenticationPrincipal Long userId,@PathVariable Long studyId, @PathVariable Long studyDeckId, @PathVariable Long wordcardId) {
        ResponseDto responseDto = ResponseDto.builder()
                .message(STUDYWORDCARD_DELETE_SUCCESS.getMessage())
                .data(studyDeckService.deleteWordcard(studyId,studyDeckId,wordcardId))
                .httpStatus(STUDYWORDCARD_DELETE_SUCCESS.getHttpStatus())
                .build();

        return ResponseEntity.ok(responseDto);
    }
}
