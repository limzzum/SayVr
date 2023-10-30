package com.npc.say_vr.domain.study.service;

import com.npc.say_vr.domain.study.dto.requestDto.CreateGoalsRequestDto;
import com.npc.say_vr.domain.study.dto.requestDto.UpdateGoalRequestDto;
import com.npc.say_vr.domain.study.dto.responseDto.GoalDetailResponseDto;
import org.springframework.transaction.annotation.Transactional;

public interface GoalService {

    GoalDetailResponseDto createGoal(Long studyId, CreateGoalsRequestDto createGoalsRequestDto);
    GoalDetailResponseDto updateGoal(Long studyId,Long weeklySprintId,Long goalId, UpdateGoalRequestDto updateGoalRequestDto);

    void updateGoalAndCheckList(Long goalId, UpdateGoalRequestDto updateGoalRequestDto);

    GoalDetailResponseDto readGoalAndCheckListItem(Long studyId,Long weeklySprintId);
}
