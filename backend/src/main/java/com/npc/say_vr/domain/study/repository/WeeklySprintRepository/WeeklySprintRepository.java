package com.npc.say_vr.domain.study.repository.WeeklySprintRepository;

import com.npc.say_vr.domain.study.domain.WeeklySprint;
import java.util.Optional;

public interface WeeklySprintRepository {

  WeeklySprint save(WeeklySprint weeklySprint);
  Optional<WeeklySprint> findById(Long weeklySprintId);



}
