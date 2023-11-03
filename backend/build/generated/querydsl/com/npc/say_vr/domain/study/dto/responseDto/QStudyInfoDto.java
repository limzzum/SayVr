package com.npc.say_vr.domain.study.dto.responseDto;

import com.querydsl.core.types.dsl.*;

import com.querydsl.core.types.ConstructorExpression;
import javax.annotation.processing.Generated;

/**
 * com.npc.say_vr.domain.study.dto.responseDto.QStudyInfoDto is a Querydsl Projection type for StudyInfoDto
 */
@Generated("com.querydsl.codegen.DefaultProjectionSerializer")
public class QStudyInfoDto extends ConstructorExpression<StudyInfoDto> {

    private static final long serialVersionUID = 1854486514L;

    public QStudyInfoDto(com.querydsl.core.types.Expression<Long> studyId, com.querydsl.core.types.Expression<String> name, com.querydsl.core.types.Expression<Integer> maxPeople, com.querydsl.core.types.Expression<Integer> currentPeople, com.querydsl.core.types.Expression<String> description, com.querydsl.core.types.Expression<String> rule, com.querydsl.core.types.Expression<com.npc.say_vr.domain.study.constant.StudyStatus> studyStatus) {
        super(StudyInfoDto.class, new Class<?>[]{long.class, String.class, int.class, int.class, String.class, String.class, com.npc.say_vr.domain.study.constant.StudyStatus.class}, studyId, name, maxPeople, currentPeople, description, rule, studyStatus);
    }

}

