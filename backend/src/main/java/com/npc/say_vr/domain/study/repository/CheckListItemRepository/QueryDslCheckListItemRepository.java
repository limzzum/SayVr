package com.npc.say_vr.domain.study.repository.CheckListItemRepository;

import static com.npc.say_vr.domain.study.domain.QChecklistItem.checklistItem;

import com.npc.say_vr.domain.study.constant.CheckListStatus;
import com.npc.say_vr.domain.study.dto.common.CheckListItemDto;
import com.npc.say_vr.domain.study.dto.common.QCheckListItemDto;
import com.querydsl.jpa.impl.JPAQueryFactory;
import java.util.List;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Repository;

@RequiredArgsConstructor
@Repository
public class QueryDslCheckListItemRepository {

  private final JPAQueryFactory queryFactory;

  public List<CheckListItemDto> findByWeeklySprintIdAndStudyId(Long weeklySprintId, Long studyMemberId) {
    return queryFactory
        .select(new QCheckListItemDto(
            checklistItem.id,
            checklistItem.checkListStatus,
            checklistItem.optionCheckItem,
            checklistItem.description,
            checklistItem.goal.count,
            checklistItem.current_count))
        .from(checklistItem)
        .where(checklistItem.weeklySprint.id.eq(weeklySprintId),
            checklistItem.studyMember.id.eq(studyMemberId),
            checklistItem.checkListStatus.ne(CheckListStatus.DELETE))
        .fetch();
  }

}
