package com.npc.say_vr.domain.study.repository.studyMemberRepository;

import com.npc.say_vr.domain.study.domain.StudyMember;
import java.util.Optional;

public interface StudyMemberRepository {
  StudyMember findByUserIdAndStudyId(Long userId, Long studyId);

  StudyMember save(StudyMember studyMember);

  StudyMember findEarliestJoinedMember(Long studyId);



}
