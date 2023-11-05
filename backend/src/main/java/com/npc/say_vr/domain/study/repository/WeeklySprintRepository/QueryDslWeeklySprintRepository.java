package com.npc.say_vr.domain.study.repository.WeeklySprintRepository;


import static com.npc.say_vr.domain.study.domain.QStudy.study;
import static com.npc.say_vr.domain.study.domain.QWeeklySprint.weeklySprint;

import com.querydsl.jpa.impl.JPAQueryFactory;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Repository;

@RequiredArgsConstructor
@Repository
public class QueryDslWeeklySprintRepository {

  private final JPAQueryFactory queryFactory;

  // TODO : weeklysprint에서 한번에 가져오기 개선할 것
//  public GoalDetailResponseDto findGoalAndCheckListItem(Long weeklySprintId) {
//    return queryFactory
//        .select(Projections.constructor(GoalDetailResponseDto.class,
//                weeklySprint.id,
//                weeklySprint.targetDate,
//                Projections.list(Projections.constructor(GoalResponseDto.class,
//                    goal.id,
//                    goal.optionType,
//                    goal.count,
//                    goal.description)),
//                Projections.list(Projections.constructor(MemberCheckListResponseDto.class,
//                    studyMember.id,
//                    Projections.list(Projections.constructor(CheckListItemDto.class,
//                        checklistItem.id,
//                        checklistItem.checkListStatus,
//                        checklistItem.optionCheckItem,
//                        checklistItem.description,
//                        Expressions.constant(checklistItem.goal),
//                        checklistItem.current_count))))))
//        .from(weeklySprint)
//        .leftJoin(weeklySprint.GoalList, goal)
//        .leftJoin(weeklySprint.checklistItemList, checklistItem)
//        .where(weeklySprint.id.eq(weeklySprintId))
//        .fetchOne();
//  }

  public Long findPreviousSprintId(Long studyId, Long weeklySprintId) {
    return queryFactory
        .select(weeklySprint.id)
        .from(weeklySprint)
        .where(weeklySprint.study.id.eq(studyId),
            weeklySprint.id.lt(weeklySprintId))
        .orderBy(weeklySprint.id.desc())
        .limit(1)
        .fetchOne();
  }

  public Long findNextSprintId(Long studyId, Long weeklySprintId) {
    return queryFactory
        .select(weeklySprint.id)
        .from(weeklySprint)
        .where(weeklySprint.study.id.eq(studyId),
            weeklySprint.id.gt(weeklySprintId))
        .orderBy(weeklySprint.id.asc())
        .limit(1)
        .fetchOne();
  }

}
