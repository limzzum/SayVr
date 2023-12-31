package com.npc.say_vr.domain.study.repository.CheckListItemRepository;

import static com.npc.say_vr.domain.study.domain.QChecklistItem.checklistItem;
import static com.npc.say_vr.domain.study.domain.QGoal.goal;

import com.npc.say_vr.domain.study.constant.CheckListStatus;
import com.npc.say_vr.domain.study.constant.OptionType;
import com.npc.say_vr.domain.study.domain.ChecklistItem;
import com.npc.say_vr.domain.study.dto.responseDto.CheckListItemDto;
import com.npc.say_vr.domain.study.dto.responseDto.QCheckListItemDto;
import com.querydsl.jpa.impl.JPAQueryFactory;
import java.time.LocalDate;
import java.util.List;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Repository;

@RequiredArgsConstructor
@Repository
public class QueryDslCheckListItemRepository {

  private final JPAQueryFactory queryFactory;

  // TODO : goal을 null 값으로 가지고 있는 checklistitem은 안들고 오는 issue
  // TODO : where 조건을 booleanEx~~ 이걸로 바꿔서 예외처리 가능할지도?

  public List<CheckListItemDto> findByWeeklySprintIdAndStudyId(Long weeklySprintId, Long studyMemberId) {
    return queryFactory
        .select(new QCheckListItemDto(
            checklistItem.id,
            checklistItem.checkListStatus,
            checklistItem.optionCheckItem,
            checklistItem.description,
            checklistItem.goal.count,
            checklistItem.current_count,
            checklistItem.goal.optionType))
        .from(checklistItem)
        .leftJoin(checklistItem.goal, goal)
        .where(checklistItem.weeklySprint.id.eq(weeklySprintId),
            checklistItem.studyMember.id.eq(studyMemberId),
            checklistItem.checkListStatus.ne(CheckListStatus.DELETE))
        .fetch();
  }

  public List<ChecklistItem> findByUserIdAndOptiontype(Long userId, OptionType optionType, LocalDate today) {
    LocalDate startDay  = today.minusDays(6);
    return queryFactory
        .selectFrom(checklistItem)
        .join(checklistItem.goal).fetchJoin()
        .where(checklistItem.weeklySprint.targetDate.loe(today),
            checklistItem.weeklySprint.targetDate.goe(startDay),
            checklistItem.studyMember.user.id.eq(userId),
            checklistItem.checkListStatus.ne(CheckListStatus.DELETE),
            checklistItem.goal.optionType.eq(optionType))
        .fetch();
  }
}
