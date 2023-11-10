package com.npc.say_vr.domain.study.api;

import static com.npc.say_vr.domain.study.constant.StudyResponseMessage.GOAL_CREATE_SUCCESS;
import static com.npc.say_vr.domain.study.constant.StudyResponseMessage.GOAL_UPDATE_SUCCESS;
import static com.npc.say_vr.domain.study.constant.StudyResponseMessage.GOAL_DELETE_SUCCESS;
import static com.npc.say_vr.domain.study.constant.StudyResponseMessage.WEEKLY_CREATE_SUCCESS;
import static com.npc.say_vr.domain.study.constant.StudyResponseMessage.WEEKLY_READ_SUCCESS;

import com.npc.say_vr.domain.study.constant.OptionType;
import com.npc.say_vr.domain.study.dto.requestDto.CreateGoalRequestDto;
import com.npc.say_vr.domain.study.dto.requestDto.CreateWeeklySprintRequestDto;
import com.npc.say_vr.domain.study.dto.requestDto.UpdateGoalRequestDto;
import com.npc.say_vr.domain.study.service.GoalService;
import com.npc.say_vr.global.dto.ResponseDto;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@CrossOrigin
@RestController
@RequiredArgsConstructor
@RequestMapping("/api/study/goal")
public class GoalApiController {
    // TODO : WeeklySprint => status 엔티티 추가하기
    // TODO : 배치로 기간 지나면 상태 바꿔줄까...???

    private final GoalService goalService;

    @PostMapping("/{studyId}")
    public ResponseEntity<?> createWeeklySprint(@PathVariable Long studyId, @RequestBody CreateWeeklySprintRequestDto createWeeklySprintRequestDto) {
        Long userId = 1L;
        ResponseDto responseDto = ResponseDto.builder()
                .message(WEEKLY_CREATE_SUCCESS.getMessage())
                .data(goalService.createWeeklySprint(userId,studyId, createWeeklySprintRequestDto))
                .httpStatus(WEEKLY_CREATE_SUCCESS.getHttpStatus())
                .build();
        return ResponseEntity.ok(responseDto);
    }

    @GetMapping("/{studyId}/{weeklySprintId}")
    public ResponseEntity<?> readWeeklySprint(@PathVariable Long studyId, @PathVariable Long weeklySprintId) {
        Long userId = 2L;
        ResponseDto responseDto = ResponseDto.builder()
            .message(WEEKLY_READ_SUCCESS.getMessage())
            .data(goalService.readWeeklySprint(userId,studyId,weeklySprintId))
            .httpStatus(WEEKLY_READ_SUCCESS.getHttpStatus())
            .build();
        return ResponseEntity.ok(responseDto);
    }

    @PostMapping("/{studyId}/{weeklySprintId}")
    public ResponseEntity<?> createGoal(@PathVariable Long studyId, @PathVariable Long weeklySprintId,@RequestBody CreateGoalRequestDto createGoalRequestDto) {
        Long userId = 1L;
        ResponseDto responseDto = ResponseDto.builder()
            .message(GOAL_CREATE_SUCCESS.getMessage())
            .data(goalService.createGoal(userId,studyId,weeklySprintId,createGoalRequestDto))
            .httpStatus(GOAL_CREATE_SUCCESS.getHttpStatus())
            .build();
        return ResponseEntity.ok(responseDto);
    }

    @PutMapping("{studyId}/{weeklySprintId}/{goalId}")
    public ResponseEntity<?> updateGoal(@PathVariable Long studyId,@PathVariable Long weeklySprintId,@PathVariable Long goalId, @RequestBody UpdateGoalRequestDto updateGoalRequestDto) {
        Long userId = 1L;
        ResponseDto responseDto = ResponseDto.builder()
            .message(GOAL_UPDATE_SUCCESS.getMessage())
            .data(goalService.updateGoal(userId,studyId,weeklySprintId,goalId,updateGoalRequestDto))
            .httpStatus(GOAL_UPDATE_SUCCESS.getHttpStatus())
            .build();
        return ResponseEntity.ok(responseDto);
    }

    @DeleteMapping("{studyId}/{weeklySprintId}/{goalId}")
    public ResponseEntity<?> deleteGoal(@PathVariable Long studyId,@PathVariable Long weeklySprintId,@PathVariable Long goalId) {
        Long userId = 1L;
        ResponseDto responseDto = ResponseDto.builder()
            .message(GOAL_DELETE_SUCCESS.getMessage())
            .data(goalService.deleteGoal(userId,studyId,weeklySprintId,goalId))
            .httpStatus(GOAL_DELETE_SUCCESS.getHttpStatus())
            .build();
        return ResponseEntity.ok(responseDto);
    }

    // TEST 코드
//    @DeleteMapping("/test")
//    public ResponseEntity<?> testGoal() {
//        Long userId = 1L;
//        OptionType optionType = OptionType.GAME;
//        goalService.updateCheckListOption(userId,optionType);
//        ResponseDto responseDto = ResponseDto.builder()
//            .message(GOAL_DELETE_SUCCESS.getMessage())
//            .httpStatus(GOAL_DELETE_SUCCESS.getHttpStatus())
//            .build();
//        return ResponseEntity.ok(responseDto);
//    }
}
