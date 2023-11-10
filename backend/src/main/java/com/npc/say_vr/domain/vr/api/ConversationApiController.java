package com.npc.say_vr.domain.vr.api;

import static com.npc.say_vr.domain.vr.constant.ConversationResponseMessage.CONVERSATION_CREATE_SUCCESS;
import static com.npc.say_vr.domain.vr.constant.ConversationResponseMessage.CONVERSATION_LIST_READ_SUCCESS;
import static com.npc.say_vr.domain.vr.constant.ConversationResponseMessage.CONVERSATION_READ_SUCCESS;
import static com.npc.say_vr.domain.vr.constant.ConversationResponseMessage.PROFICIENCY_READ_SUCCESS;

import com.npc.say_vr.domain.study.constant.OptionType;
import com.npc.say_vr.domain.study.service.GoalService;
import com.npc.say_vr.domain.vr.dto.ConversationRequestDto.CreateConversationRequestDto;
import com.npc.say_vr.domain.vr.service.ConversationService;
import com.npc.say_vr.global.dto.ResponseDto;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/conversation")
public class ConversationApiController {

    private final ConversationService conversationService;
    private final GoalService goalService;
    //TODO: 예외처리 -> 실패했을 때

    @PostMapping("/")
    public ResponseEntity<?> createConversation
        (@AuthenticationPrincipal Long userId,
            @RequestBody CreateConversationRequestDto createConversationRequestDto) {
        ResponseDto responseDto = ResponseDto.builder()
            .message(CONVERSATION_CREATE_SUCCESS.getMessage())
            .httpStatus(CONVERSATION_CREATE_SUCCESS.getHttpStatus())
            .data(conversationService.createConversation(userId, createConversationRequestDto))
            .build();
        goalService.updateCheckListOption(userId, OptionType.VR);
        return ResponseEntity.ok(responseDto);
    }

    @GetMapping("/score")
    public ResponseEntity<?> readMyProficiencyInfo(@AuthenticationPrincipal Long userId) {
        ResponseDto responseDto = ResponseDto.builder()
            .message(PROFICIENCY_READ_SUCCESS.getMessage())
            .httpStatus(PROFICIENCY_READ_SUCCESS.getHttpStatus())
            .data(conversationService.readProficiency(userId))
            .build();
        return ResponseEntity.ok(responseDto);
    }

    @GetMapping("/monthly")
    public ResponseEntity<?> readMonthlyConversation(@AuthenticationPrincipal Long userId,
        @RequestParam int year, @RequestParam int month) {
        ResponseDto responseDto = ResponseDto.builder()
            .message(CONVERSATION_LIST_READ_SUCCESS.getMessage())
            .httpStatus(CONVERSATION_LIST_READ_SUCCESS.getHttpStatus())
            .data(conversationService.readMonthlyConversationList(userId, year, month))
            .build();
        return ResponseEntity.ok(responseDto);
    }

    //내 대화 목록 조회 -> 며칠자 대화 ID
    @GetMapping("/list")
    public ResponseEntity<?> readMyConversationList(@AuthenticationPrincipal Long userId) {
        ResponseDto responseDto = ResponseDto.builder()
            .message(CONVERSATION_LIST_READ_SUCCESS.getMessage())
            .httpStatus(CONVERSATION_LIST_READ_SUCCESS.getHttpStatus())
            .data(conversationService.readMyConversationList(userId))
            .build();
        return ResponseEntity.ok(responseDto);
    }

    @GetMapping("/{conversationId}")
    public ResponseEntity<?> readConversation
        (@AuthenticationPrincipal Long userId, @PathVariable Long conversationId) {
        ResponseDto responseDto = ResponseDto.builder()
            .message(CONVERSATION_READ_SUCCESS.getMessage())
            .httpStatus(CONVERSATION_READ_SUCCESS.getHttpStatus())
            .data(conversationService.readConversation(userId, conversationId))
            .build();
        return ResponseEntity.ok(responseDto);
    }

}
