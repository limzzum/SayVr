package com.npc.say_vr.domain.study.dto.requestDto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@Builder
@AllArgsConstructor
public class UpdateStudyRequestDto {
    private String name;
    private int maxPeople;
    private String description;
    private String rule;
}
