package com.npc.say_vr.domain.study.service;

import com.npc.say_vr.domain.study.dto.requestDto.CreateGoalRequestDto;
import com.npc.say_vr.domain.study.dto.requestDto.CreateWeeklySprintRequestDto;
import com.npc.say_vr.domain.study.dto.requestDto.UpdateGoalRequestDto;
import com.npc.say_vr.domain.study.dto.responseDto.GoalDetailResponseDto;
import com.npc.say_vr.domain.study.dto.responseDto.WeeklySprintDetailResponse;
import org.springframework.transaction.annotation.Transactional;

public interface GoalService {

    WeeklySprintDetailResponse createWeeklySprint(Long userId,Long studyId, CreateWeeklySprintRequestDto createWeeklySprintRequestDto);

    WeeklySprintDetailResponse createGoal(Long userId,Long studyId, Long weeklySprintId, CreateGoalRequestDto createGoalRequestDto);

    void createGoalAndSave(Long studyId, Long weeklySprintId,CreateGoalRequestDto createGoalRequestDto);

    WeeklySprintDetailResponse readWeeklySprint(Long userId, Long studyId, Long weeklySprintId);

    WeeklySprintDetailResponse updateGoal(Long userId,Long studyId,Long weeklySprintId,Long goalId, UpdateGoalRequestDto updateGoalRequestDto);

    void updateGoalAndCheckList(Long goalId, UpdateGoalRequestDto updateGoalRequestDto);

    WeeklySprintDetailResponse readGoalAndCheckListItem(Long userId,Long studyId,Long weeklySprintId);

    Long findPreviousSprintId(Long studyId, Long weeklySprintId);

    Long findNextSprintId(Long studyId, Long weeklySprintId);

    WeeklySprintDetailResponse deleteGoal(Long userId,Long studyId,Long weeklySprintId,Long goalId);

    void deleteGoalAndSave(Long goalId);
}
