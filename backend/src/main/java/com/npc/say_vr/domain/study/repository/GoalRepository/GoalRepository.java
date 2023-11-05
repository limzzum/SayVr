package com.npc.say_vr.domain.study.repository.GoalRepository;

import com.npc.say_vr.domain.study.constant.OptionType;
import com.npc.say_vr.domain.study.domain.Goal;
import com.npc.say_vr.domain.study.dto.responseDto.GoalResponseDto;
import java.util.List;

public interface GoalRepository {
  Goal save(Goal goal);

  Goal findGoalAndCheckListItem(Long goadId);

  List<GoalResponseDto> findGoalAndWeeklySprintId(Long weeklySprintId);

  Boolean existGoal(Long weeklySprintId, OptionType optionType);

}
