package com.npc.say_vr.domain.study.repository.WeeklySprintRepository;

import com.npc.say_vr.domain.study.domain.WeeklySprint;
import java.util.Optional;

public interface WeeklySprintRepository {

  WeeklySprint save(WeeklySprint weeklySprint);
  Optional<WeeklySprint> findById(Long weeklySprintId);

  Long findPreviousSprintId(Long studyId,Long weeklySprintId);

  Long findNextSprintId(Long studyId,Long weeklySprintId);

  Long findNowSprintId(Long studyId);

  WeeklySprint findNowSprint(Long studyId);


}
