package com.npc.say_vr.domain.study.repository.WeeklySprintRepository;

import com.npc.say_vr.domain.study.domain.WeeklySprint;
import java.util.Optional;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Repository;

@Repository
@RequiredArgsConstructor
public class WeeklySprintRepositoryImpl implements WeeklySprintRepository{

  private final JpaWeeklySprintRepository jpaWeeklySprintRepository;
  private final QueryDslWeeklySprintRepository queryDslWeeklySprintRepository;

  @Override
  public WeeklySprint save(WeeklySprint weeklySprint) {
    return jpaWeeklySprintRepository.save(weeklySprint);
  }

  public Optional<WeeklySprint> findById(Long weeklySprintId){
    return jpaWeeklySprintRepository.findById(weeklySprintId);
  }
}
