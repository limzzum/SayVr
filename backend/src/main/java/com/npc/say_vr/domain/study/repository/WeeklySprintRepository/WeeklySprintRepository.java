package com.npc.say_vr.domain.study.repository.WeeklySprintRepository;

import com.npc.say_vr.domain.study.domain.StudyMember;
import com.npc.say_vr.domain.study.domain.WeeklySprint;
import org.springframework.data.jpa.repository.JpaRepository;

public interface WeeklySprintRepository extends JpaRepository<WeeklySprint, Long> {
}
