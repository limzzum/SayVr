package com.npc.say_vr.domain.study.api;

import static com.npc.say_vr.domain.study.constant.StudyResponseMessage.CHECKLISTITEM_CREATE_SUCCESS;

import com.npc.say_vr.domain.study.dto.requestDto.CreateCheckListRequestDto;
import com.npc.say_vr.domain.study.service.CheckListService;
import com.npc.say_vr.domain.study.service.GoalService;
import com.npc.say_vr.global.dto.ResponseDto;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@CrossOrigin
@RestController
@RequiredArgsConstructor
@RequestMapping("/api/study/checkList")
public class checkListApiController {

  private final CheckListService checkListService;
  private final GoalService goalService;

  @PostMapping("{studyId}/{weeklySprintId}")
  public ResponseEntity<?> createCheckListItem(@PathVariable Long studyId, @PathVariable Long weeklySprintId,@RequestBody CreateCheckListRequestDto createCheckListRequestDto) {
    Long userId = 1L;
    checkListService.createCheckListItem(studyId,weeklySprintId,createCheckListRequestDto);
    ResponseDto responseDto = ResponseDto.builder()
        .message(CHECKLISTITEM_CREATE_SUCCESS.getMessage())
        .data(goalService.readGoalAndCheckListItem(userId,studyId,weeklySprintId))
        .httpStatus(CHECKLISTITEM_CREATE_SUCCESS.getHttpStatus())
        .build();
    return ResponseEntity.ok(responseDto);
  }

}
