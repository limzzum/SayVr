package com.npc.say_vr.domain.user.repository.activityRepository;

import com.npc.say_vr.domain.user.domain.Activity;
import org.springframework.data.jpa.repository.JpaRepository;

public interface JpaActivityRepository extends JpaRepository<Activity, Long> {

}
