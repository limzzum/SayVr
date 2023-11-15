package com.npc.say_vr.domain.study.repository.studyMemberRepository;

import com.npc.say_vr.domain.study.domain.StudyMember;
import com.npc.say_vr.global.constant.Status;
import java.util.List;
import java.util.Optional;
import org.springframework.data.jpa.repository.JpaRepository;

public interface JpaStudyMemberRepository extends JpaRepository<StudyMember, Long> {

    List<StudyMember> findByStudyIdAndStatus(Long studyId,Status status);

    Optional<StudyMember> findByUserIdAndStudyId(Long userId,Long studyId);

}
