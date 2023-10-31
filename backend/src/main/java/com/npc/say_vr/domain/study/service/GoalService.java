package com.npc.say_vr.domain.study.service;

import com.npc.say_vr.domain.study.dto.requestDto.CreateGoalsRequestDto;
import com.npc.say_vr.domain.study.dto.requestDto.UpdateGoalRequestDto;
import com.npc.say_vr.domain.study.dto.responseDto.GoalDetailResponseDto;
import com.npc.say_vr.domain.study.dto.responseDto.WeeklySprintDetailResponse;
import org.springframework.transaction.annotation.Transactional;

public interface GoalService {

    WeeklySprintDetailResponse createGoal(Long studyId, CreateGoalsRequestDto createGoalsRequestDto);
    WeeklySprintDetailResponse updateGoal(Long studyId,Long weeklySprintId,Long goalId, UpdateGoalRequestDto updateGoalRequestDto);

    void updateGoalAndCheckList(Long goalId, UpdateGoalRequestDto updateGoalRequestDto);

    WeeklySprintDetailResponse readGoalAndCheckListItem(Long studyId,Long weeklySprintId);

    Long findPreviousSprintId(Long studyId, Long weeklySprintId);

    Long findNextSprintId(Long studyId, Long weeklySprintId);

}
