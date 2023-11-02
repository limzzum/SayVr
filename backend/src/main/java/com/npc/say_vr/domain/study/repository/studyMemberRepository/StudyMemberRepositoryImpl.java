package com.npc.say_vr.domain.study.repository.studyMemberRepository;

import com.npc.say_vr.domain.study.domain.StudyMember;
import com.npc.say_vr.global.constant.Status;
import java.util.List;
import java.util.Optional;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Repository;

@Repository
@RequiredArgsConstructor
public class StudyMemberRepositoryImpl implements StudyMemberRepository{

  private final JpaStudyMemberRepository jpaStudyMemberRepository;
  private final QueryDslStudyMemberRepository queryDslStudyMemberRepository;

  @Override
  public StudyMember findByUserIdAndStudyId(Long userId, Long studyId) {
    return queryDslStudyMemberRepository.findByUserIdAndStudyId(userId,studyId);
  }

  @Override
  public StudyMember save(StudyMember studyMember) {
    return jpaStudyMemberRepository.save(studyMember);
  }

  @Override
  public Optional<StudyMember> findById(Long studyMemberId) {
    return jpaStudyMemberRepository.findById(studyMemberId);
  }

  @Override
  public StudyMember findEarliestJoinedMember(Long studyId) {
    return queryDslStudyMemberRepository.findEarliestJoinedMember(studyId);
  }


  // TODO : STUDYMEMBERID만 반환하기
  @Override
  public List<StudyMember> findByStudyIdAndStatus(Long studyId, Status status) {
    return jpaStudyMemberRepository.findByStudyIdAndStatus(studyId,status);
  }

  @Override
  public StudyMember myfindAndNickNameByStudyId(Long userId, Long studyId) {
    return queryDslStudyMemberRepository.myfindAndNickNameByStudyId(userId, studyId);
  }

  @Override
  public List<StudyMember> findAndNickNameByStudyId(Long userId,Long studyId) {
    return queryDslStudyMemberRepository.findAndNickNameByStudyIdNEUserId(userId, studyId);
  }

  // TODO : SUTDYMEMBER랑 연결된 CHECKLIST한번에 가져오기
//  @Override
//  public List<StudyMember> getStudyMembersWithChecklistItems(Long studyId, Long weeklySprintId) {
//    return queryDslStudyMemberRepository.getStudyMembersWithChecklistItems(studyId, weeklySprintId);
//  }


}
