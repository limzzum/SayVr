package com.npc.say_vr.domain.study.dto.responseDto;

import com.npc.say_vr.domain.study.constant.StudyRole;
import com.npc.say_vr.domain.study.constant.StudyStatus;
import com.querydsl.core.annotations.QueryProjection;
import lombok.Builder;
import lombok.Getter;

@Getter
public class StudyInfoDto {

    private Long studyId;
    private String name;
    private int maxPeople;
    private int currentPeople;
    private String description;
    private String rule;
    private StudyStatus studyStatus;

    @QueryProjection
    @Builder
    public StudyInfoDto(Long studyId, String name, int maxPeople, int currentPeople, String description, String rule,
                          StudyStatus studyStatus) {
        this.studyId = studyId;
        this.name = name;
        this.maxPeople = maxPeople;
        this.currentPeople = currentPeople;
        this.description = description;
        this.rule = rule;
        this.studyStatus = studyStatus;
    }
}
