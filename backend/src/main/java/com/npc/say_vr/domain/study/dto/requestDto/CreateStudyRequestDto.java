package com.npc.say_vr.domain.study.dto.requestDto;

import com.npc.say_vr.domain.study.domain.Study;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@Builder
@AllArgsConstructor
public class CreateStudyRequestDto {
    private String name;
    private int maxPeople;
    private String description;
    private String rule;

    public Study toEntity() {
        return Study.builder()
                .name(name)
                .maxPeople(maxPeople)
                .currentPeople(1)
                .description(description)
                .rule(rule)
                .build();
    }
}
