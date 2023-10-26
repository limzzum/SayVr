package com.npc.say_vr.domain.study.dto;

import com.npc.say_vr.domain.study.constant.StudyRole;
import com.npc.say_vr.domain.study.domain.Study;
import lombok.Builder;
import lombok.Getter;

public class StudyResponseDto {

    @Getter
    public static class StudyDetailInfoResponseDto {

        private Long studyId;
        private String name;
        private String description;
        private String rule;
        private Long memberId;
        private StudyRole studyRole;

        @Builder
        public StudyDetailInfoResponseDto(Long studyId, String name, String description,
            String rule,
            Long memberId, StudyRole studyRole) {
            this.studyId = studyId;
            this.name = name;
            this.description = description;
            this.rule = rule;
            this.memberId = memberId;
            this.studyRole = studyRole;
        }
    }
    }
