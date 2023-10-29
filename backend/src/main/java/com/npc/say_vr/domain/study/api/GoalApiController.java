package com.npc.say_vr.domain.study.api;

import static com.npc.say_vr.domain.study.constant.StudyResponseMessage.GOAL_CREATE_SUCCESS;
import com.npc.say_vr.domain.study.dto.requestDto.CreateGoalRequestDto;
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
@RequestMapping("/api/study/Goal")
public class GoalApiController {

    private final GoalService goalService;

    @PostMapping("/{studyId}")
    public ResponseEntity<?> createGoal(@PathVariable Long studyId, @RequestBody CreateGoalRequestDto createGoalRequestDto) {
        Long userId = 1L;
        ResponseDto responseDto = ResponseDto.builder()
                .message(GOAL_CREATE_SUCCESS.getMessage())
                .data(goalService.createGoal(studyId, createGoalRequestDto))
                .httpStatus(GOAL_CREATE_SUCCESS.getHttpStatus())
                .build();
        return ResponseEntity.ok(responseDto);
    }
}
