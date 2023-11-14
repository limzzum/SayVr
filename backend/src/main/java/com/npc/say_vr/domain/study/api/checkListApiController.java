package com.npc.say_vr.domain.study.api;

import static com.npc.say_vr.domain.study.constant.StudyResponseMessage.CHECKLISTITEM_CREATE_SUCCESS;
import static com.npc.say_vr.domain.study.constant.StudyResponseMessage.CHECKLISTITEM_UPDATE_SUCCESS;
import static com.npc.say_vr.domain.study.constant.StudyResponseMessage.CHECKLISTITEMSTATUS_UPDATE_SUCCESS;
import static com.npc.say_vr.domain.study.constant.StudyResponseMessage.CHECKLISTITEM_DELETE_SUCCESS;
import com.npc.say_vr.domain.study.dto.requestDto.CreateCheckListRequestDto;
import com.npc.say_vr.domain.study.dto.requestDto.UpdateCheckListRequestDto;
import com.npc.say_vr.domain.study.dto.requestDto.UpdateCheckListStatusResquestDto;
import com.npc.say_vr.domain.study.service.CheckListService;
import com.npc.say_vr.domain.study.service.GoalService;
import com.npc.say_vr.global.dto.ResponseDto;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/study/checkList")
public class checkListApiController {

  private final CheckListService checkListService;
  private final GoalService goalService;

  @PostMapping("/{studyId}/{weeklySprintId}")
  public ResponseEntity<?> createCheckListItem(@AuthenticationPrincipal Long userId,@PathVariable Long studyId, @PathVariable Long weeklySprintId,@RequestBody CreateCheckListRequestDto createCheckListRequestDto) {
    checkListService.createCheckListItem(studyId,weeklySprintId,createCheckListRequestDto);
    ResponseDto responseDto = ResponseDto.builder()
        .message(CHECKLISTITEM_CREATE_SUCCESS.getMessage())
        .data(goalService.readGoalAndCheckListItem(userId,studyId,weeklySprintId))
        .httpStatus(CHECKLISTITEM_CREATE_SUCCESS.getHttpStatus())
        .build();
    return ResponseEntity.ok(responseDto);
  }

  @PutMapping("/{studyId}/{weeklySprintId}/{checkListId}")
  public ResponseEntity<?> updateCheckListItem(@AuthenticationPrincipal Long userId,@PathVariable Long studyId, @PathVariable Long weeklySprintId,@PathVariable Long checkListId,@RequestBody UpdateCheckListRequestDto updateCheckListRequestDto) {
    checkListService.updateCheckListItem(checkListId,updateCheckListRequestDto);
    ResponseDto responseDto = ResponseDto.builder()
        .message(CHECKLISTITEM_UPDATE_SUCCESS.getMessage())
        .data(goalService.readGoalAndCheckListItem(userId,studyId,weeklySprintId))
        .httpStatus(CHECKLISTITEM_UPDATE_SUCCESS.getHttpStatus())
        .build();
    return ResponseEntity.ok(responseDto);
  }

  @PatchMapping("/status/{studyId}/{weeklySprintId}/{checkListId}") // TODO : POSTMAN TEST & API 명세서 수정
  public ResponseEntity<?> updateCheckListItemStatus(@AuthenticationPrincipal Long userId,@PathVariable Long studyId, @PathVariable Long weeklySprintId, @PathVariable Long checkListId, @RequestBody
  UpdateCheckListStatusResquestDto updateCheckListStatusResquestDto) {
    checkListService.updateCheckListItemStatus(checkListId,updateCheckListStatusResquestDto);
    ResponseDto responseDto = ResponseDto.builder()
            .message(CHECKLISTITEMSTATUS_UPDATE_SUCCESS.getMessage())
            .data(goalService.readGoalAndCheckListItem(userId,studyId,weeklySprintId))
            .httpStatus(CHECKLISTITEMSTATUS_UPDATE_SUCCESS.getHttpStatus())
            .build();
    return ResponseEntity.ok(responseDto);
  }

  @DeleteMapping("/{studyId}/{weeklySprintId}/{checkListId}") // TODO : POSTMAN TEST & API 명세서 수정
  public ResponseEntity<?> deleteCheckListItem(@AuthenticationPrincipal Long userId,@PathVariable Long studyId, @PathVariable Long weeklySprintId, @PathVariable Long checkListId) {
    checkListService.deleteCheckListItemStatus(checkListId);
    ResponseDto responseDto = ResponseDto.builder()
            .message(CHECKLISTITEM_DELETE_SUCCESS.getMessage())
            .data(goalService.readGoalAndCheckListItem(userId,studyId,weeklySprintId))
            .httpStatus(CHECKLISTITEM_DELETE_SUCCESS.getHttpStatus())
            .build();
    return ResponseEntity.ok(responseDto);
  }

}
