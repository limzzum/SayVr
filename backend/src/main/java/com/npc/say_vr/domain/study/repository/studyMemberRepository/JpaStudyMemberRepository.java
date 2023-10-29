package com.npc.say_vr.domain.study.repository.studyMemberRepository;

import com.npc.say_vr.domain.study.domain.StudyMember;
import java.util.Optional;
import org.springframework.data.jpa.repository.JpaRepository;

public interface JpaStudyMemberRepository extends JpaRepository<StudyMember, Long> {
    Optional<StudyMember>
    findByUserIdAndStudyId(Long userId, Long studyId);

}
