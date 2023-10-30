package com.npc.say_vr.domain.study.api;

import static com.npc.say_vr.domain.study.constant.StudyResponseMessage.GOAL_CREATE_SUCCESS;
import static com.npc.say_vr.domain.study.constant.StudyResponseMessage.GOAL_UPDATE_SUCCESS;
import com.npc.say_vr.domain.study.dto.requestDto.CreateGoalsRequestDto;
import com.npc.say_vr.domain.study.dto.requestDto.UpdateGoalRequestDto;
import com.npc.say_vr.domain.study.service.GoalService;
import com.npc.say_vr.global.dto.ResponseDto;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
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

    private final GoalService goalService;

    @PostMapping("/{studyId}")
    public ResponseEntity<?> createGoal(@PathVariable Long studyId, @RequestBody CreateGoalsRequestDto createGoalsRequestDto) {
        Long userId = 1L;
        ResponseDto responseDto = ResponseDto.builder()
                .message(GOAL_CREATE_SUCCESS.getMessage())
                .data(goalService.createGoal(studyId, createGoalsRequestDto))
                .httpStatus(GOAL_CREATE_SUCCESS.getHttpStatus())
                .build();
        return ResponseEntity.ok(responseDto);
    }

    @PutMapping("{studyId}/{weeklySprintId}/{goalId}")
    public ResponseEntity<?> updateGoal(@PathVariable Long studyId,@PathVariable Long weeklySprintId,@PathVariable Long goalId, @RequestBody UpdateGoalRequestDto updateGoalRequestDto) {
        Long userId = 1L;
        ResponseDto responseDto = ResponseDto.builder()
            .message(GOAL_UPDATE_SUCCESS.getMessage())
            .data(goalService.updateGoal(studyId,weeklySprintId,goalId,updateGoalRequestDto))
            .httpStatus(GOAL_UPDATE_SUCCESS.getHttpStatus())
            .build();
        return ResponseEntity.ok(responseDto);
    }
}
