package com.npc.say_vr.domain.study.repository.studyMemberRepository;

import static com.npc.say_vr.domain.study.domain.QChecklistItem.checklistItem;
import static com.npc.say_vr.domain.study.domain.QStudy.study;
import static com.npc.say_vr.domain.study.domain.QStudyMember.studyMember;

import com.npc.say_vr.domain.study.constant.CheckListStatus;
import com.npc.say_vr.domain.study.constant.StudyRole;
import com.npc.say_vr.domain.study.constant.StudyStatus;
import com.npc.say_vr.domain.study.domain.StudyMember;
import com.npc.say_vr.global.constant.Status;
import com.querydsl.jpa.impl.JPAQueryFactory;
import java.util.List;
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
            .where(studyMember.user.id.eq(userId), study.id.eq(studyId),
                    study.studyStatus.ne(StudyStatus.DELETE))
            .fetchOne();
  }

  public StudyMember findEarliestJoinedMember(Long studyId) {
    return queryFactory.selectFrom(studyMember)
            .where(studyMember.study.id.eq(studyId),
                    studyMember.studyRole.eq(StudyRole.MEMBER),
                    studyMember.status.eq(Status.ACTIVE))
            .orderBy(studyMember.createdAt.asc())
            .fetchFirst();
  }

  // TODO : SUTDYMEMBER랑 연결된 CHECKLIST한번에 가져오기
//  public List<StudyMember> getStudyMembersWithChecklistItems(Long studyId, Long weeklySprintId) {
//    return queryFactory
//        .select(studyMember)
//        .from(studyMember)
//        .innerJoin(studyMember.checklistItemList, checklistItem)
//        .on(checklistItem.weeklySprint.id.eq(weeklySprintId))
//        .where(studyMember.study.id.eq(studyId).and(checklistItem.checkListStatus.ne(
//            CheckListStatus.DELETE)))
//        .fetch();
//  }



}
