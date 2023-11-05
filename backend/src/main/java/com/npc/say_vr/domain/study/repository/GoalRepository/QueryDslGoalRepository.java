package com.npc.say_vr.domain.study.repository.GoalRepository;



import static com.npc.say_vr.domain.study.domain.QChecklistItem.checklistItem;
import static com.npc.say_vr.domain.study.domain.QGoal.goal;

import com.npc.say_vr.domain.study.constant.OptionType;
import com.npc.say_vr.domain.study.domain.Goal;
import com.npc.say_vr.domain.study.dto.responseDto.GoalResponseDto;
import com.npc.say_vr.domain.study.dto.responseDto.QGoalResponseDto;
import com.querydsl.jpa.impl.JPAQueryFactory;
import java.util.List;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Repository;

@RequiredArgsConstructor
@Repository
public class QueryDslGoalRepository {

  private final JPAQueryFactory jpaQueryFactory;

  public Goal findGoalAndCheckListItem(Long goalId) {
    return jpaQueryFactory.selectFrom(goal)
        .leftJoin(goal.checklistItemList,checklistItem).fetchJoin()
        .where(goal.id.eq(goalId),goal.optionType.ne(OptionType.DELETE))
        .fetchOne();
  }

  public List<GoalResponseDto> findGoalAndWeeklySprintId(Long weeklySprintId) {
    return jpaQueryFactory
        .select(new QGoalResponseDto(
            goal.id,
            goal.optionType,
            goal.count,
            goal.description))
        .from(goal)
        .where(goal.weeklySprint.id.eq(weeklySprintId), goal.optionType.ne(OptionType.DELETE))
        .fetch();
  }

  public Boolean existGoal(Long weeklySprintId,OptionType optionType) {
    Integer fetchOne = jpaQueryFactory
        .selectOne()
        .from(goal)
        .where(goal.optionType.eq(optionType),goal.weeklySprint.id.eq(weeklySprintId),goal.optionType.ne(OptionType.DELETE))
        .fetchFirst();
    return fetchOne != null;
  }

}
