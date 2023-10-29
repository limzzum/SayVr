package com.npc.say_vr.domain.study.service;

import com.npc.say_vr.domain.study.dto.requestDto.CreateGoalRequestDto;
import com.npc.say_vr.domain.study.dto.responseDto.GoalDetailResponseDto;

public interface GoalService {

    GoalDetailResponseDto createGoal(Long studyId, CreateGoalRequestDto createGoalRequestDto);
}
