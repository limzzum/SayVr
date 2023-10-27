package com.npc.say_vr.domain.study.repository;

import com.npc.say_vr.domain.study.domain.StudyMember;
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


}
