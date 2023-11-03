package com.npc.say_vr.domain.study.dto.responseDto;

import com.querydsl.core.types.dsl.*;

import com.querydsl.core.types.ConstructorExpression;
import javax.annotation.processing.Generated;

/**
 * com.npc.say_vr.domain.study.dto.responseDto.QGoalResponseDto is a Querydsl Projection type for GoalResponseDto
 */
@Generated("com.querydsl.codegen.DefaultProjectionSerializer")
public class QGoalResponseDto extends ConstructorExpression<GoalResponseDto> {

    private static final long serialVersionUID = 1927621857L;

    public QGoalResponseDto(com.querydsl.core.types.Expression<Long> goalId, com.querydsl.core.types.Expression<com.npc.say_vr.domain.study.constant.OptionType> optionType, com.querydsl.core.types.Expression<Integer> count, com.querydsl.core.types.Expression<String> description) {
        super(GoalResponseDto.class, new Class<?>[]{long.class, com.npc.say_vr.domain.study.constant.OptionType.class, int.class, String.class}, goalId, optionType, count, description);
    }

}

