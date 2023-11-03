package com.npc.say_vr.domain.study.dto.responseDto;

import com.querydsl.core.types.dsl.*;

import com.querydsl.core.types.ConstructorExpression;
import javax.annotation.processing.Generated;

/**
 * com.npc.say_vr.domain.study.dto.responseDto.QCheckListItemDto is a Querydsl Projection type for CheckListItemDto
 */
@Generated("com.querydsl.codegen.DefaultProjectionSerializer")
public class QCheckListItemDto extends ConstructorExpression<CheckListItemDto> {

    private static final long serialVersionUID = -550656048L;

    public QCheckListItemDto(com.querydsl.core.types.Expression<Long> checkListId, com.querydsl.core.types.Expression<com.npc.say_vr.domain.study.constant.CheckListStatus> checkListStatus, com.querydsl.core.types.Expression<com.npc.say_vr.domain.study.constant.OptionCheckItem> optionCheckItem, com.querydsl.core.types.Expression<String> description, com.querydsl.core.types.Expression<Integer> goal_count, com.querydsl.core.types.Expression<Integer> current_count) {
        super(CheckListItemDto.class, new Class<?>[]{long.class, com.npc.say_vr.domain.study.constant.CheckListStatus.class, com.npc.say_vr.domain.study.constant.OptionCheckItem.class, String.class, int.class, int.class}, checkListId, checkListStatus, optionCheckItem, description, goal_count, current_count);
    }

}

