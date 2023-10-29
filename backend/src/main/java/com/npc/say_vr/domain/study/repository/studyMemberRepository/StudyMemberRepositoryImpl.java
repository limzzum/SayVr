package com.npc.say_vr.domain.study.repository.studyMemberRepository;

import com.npc.say_vr.domain.study.domain.StudyMember;
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
  public StudyMember findEarliestJoinedMember(Long studyId) {
    return queryDslStudyMemberRepository.findEarliestJoinedMember(studyId);
  }


}
