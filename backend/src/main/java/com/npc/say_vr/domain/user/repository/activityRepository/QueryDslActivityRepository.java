package com.npc.say_vr.domain.user.repository.activityRepository;

import static com.npc.say_vr.domain.user.domain.QActivity.activity;

import com.npc.say_vr.domain.study.constant.OptionType;
import com.npc.say_vr.domain.user.dto.ActivityDto;
import com.npc.say_vr.domain.user.dto.QActivityDto;
import com.querydsl.core.types.ConstantImpl;
import com.querydsl.core.types.dsl.Expressions;
import com.querydsl.core.types.dsl.StringTemplate;
import com.querydsl.jpa.impl.JPAQueryFactory;
import java.time.LocalDate;
import java.util.List;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Repository;

@RequiredArgsConstructor
@Repository
public class QueryDslActivityRepository {

  private final JPAQueryFactory queryFactory;

  public List<ActivityDto> readActvityYear(Long userId, LocalDate date) {
    StringTemplate formattedDate = Expressions.stringTemplate(
        "DATE_FORMAT({0}, {1})"
        , activity.createdAt
        , ConstantImpl.create("%Y-%m-%d"));

    return queryFactory
        .select(new QActivityDto(formattedDate, activity.id.count()))
        .from(activity)
        .where(activity.user.id.eq(userId)
            .and(activity.createdAt.year().eq(date.getYear()))
            .and(activity.optionType.ne(OptionType.DELETE)))
        .groupBy(formattedDate)
        .fetch();
  }
}
