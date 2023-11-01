package com.npc.say_vr.domain.study.repository.GoalRepository;

import com.npc.say_vr.domain.study.domain.Goal;
import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;

public interface JpaGoalRepository extends JpaRepository<Goal, Long> {
  List<Goal> findByWeeklySprintId(Long weeklySprintId);
}
