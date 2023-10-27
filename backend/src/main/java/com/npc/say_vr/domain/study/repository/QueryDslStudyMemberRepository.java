package com.npc.say_vr.domain.study.repository;

import static com.npc.say_vr.domain.study.domain.QStudy.study;
import static com.npc.say_vr.domain.study.domain.QStudyMember.studyMember;

import com.npc.say_vr.domain.study.domain.StudyMember;
import com.querydsl.jpa.impl.JPAQueryFactory;
import java.util.Optional;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Repository;

@RequiredArgsConstructor
@Repository
public class QueryDslStudyMemberRepository {

  private final JPAQueryFactory queryFactory;

  public StudyMember findByUserIdAndStudyId(Long userId, Long studyId) {
    return queryFactory.selectFrom(studyMember)
        .join(studyMember.study, study).fetchJoin()
        .where(studyMember.user.id.eq(userId), study.id.eq(studyId))
        .fetchOne();
  }
}
