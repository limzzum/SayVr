package com.npc.say_vr.domain.study.repository.studyRepository;

import com.npc.say_vr.domain.study.domain.Study;
import org.springframework.data.jpa.repository.JpaRepository;

public interface JpaStudyRepository extends JpaRepository<Study, Long> {

}
