package com.npc.say_vr.domain.study.repository;

import com.npc.say_vr.domain.study.domain.Study;
import com.npc.say_vr.domain.study.domain.StudyMember;
import org.springframework.data.jpa.repository.JpaRepository;

public interface StudyMemberRepository extends JpaRepository<StudyMember, Long> {

}
