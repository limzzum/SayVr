package com.npc.say_vr.domain.study.repository.GoalRepository;

import com.npc.say_vr.domain.study.domain.Goal;
import com.npc.say_vr.domain.study.dto.responseDto.GoalResponseDto;
import java.util.List;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Repository;

@Repository
@RequiredArgsConstructor
public class GoalRepositoryImpl implements GoalRepository{

  private final JpaGoalRepository jpaGoalRepository;
  private final QueryDslGoalRepository queryDslGoalRepository;

  @Override
  public Goal save(Goal goal) {
    return jpaGoalRepository.save(goal);
  }

  @Override
  public Goal findGoalAndCheckListItem(Long goadId) {
    return queryDslGoalRepository.findGoalAndCheckListItem(goadId);
  }

  @Override
  public List<GoalResponseDto> findGoalAndWeeklySprintId(Long weeklySprintId) {
    return queryDslGoalRepository.findGoalAndWeeklySprintId(weeklySprintId);
  }


}
