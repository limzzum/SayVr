package com.npc.say_vr.domain.study.dto;

import com.npc.say_vr.domain.study.domain.Study;
import com.npc.say_vr.domain.study.domain.StudyMember;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

public class StudyRequestDto {

    @Data
    @NoArgsConstructor
    @Builder
    @AllArgsConstructor
    public static class CreateStudyRequestDto {
        private String name;
        private int maxPeople;
        private String description;
        private String rule;

        public Study toEntity() {
            return Study.builder()
                .name(name)
                .maxPeople(maxPeople)
                .description(description)
                .rule(rule)
                .build();
        }
    }



}
