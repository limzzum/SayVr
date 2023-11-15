package com.npc.say_vr.domain.study.repository.studyMemberRepository;

import com.npc.say_vr.domain.study.domain.StudyMember;
import com.npc.say_vr.domain.study.domain.WeeklySprint;
import com.npc.say_vr.global.constant.Status;
import java.util.List;
import java.util.Optional;

public interface StudyMemberRepository {
  StudyMember findByUserIdAndStudyId(Long userId, Long studyId);

  Optional<StudyMember> findByUserIdAndStudyIdOnlyStudyMember(Long userId, Long studyId);

  StudyMember save(StudyMember studyMember);

  Optional<StudyMember> findById(Long studyMemberId);

  StudyMember findEarliestJoinedMember(Long studyId);

  // TODO : SUTDYMEMBER랑 연결된 CHECKLIST한번에 가져오기
//  List<StudyMember> getStudyMembersWithChecklistItems(Long studyId, Long weeklySprintId);

  List<StudyMember> findByStudyIdAndStatus(Long studyId,Status status);

  StudyMember myfindAndNickNameByStudyId(Long userId, Long studyId);
  List<StudyMember> findAndNickNameByStudyId(Long userId,Long studyId);

}
