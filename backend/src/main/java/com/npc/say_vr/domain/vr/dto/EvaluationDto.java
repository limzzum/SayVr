package com.npc.say_vr.domain.vr.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@NoArgsConstructor
@AllArgsConstructor
@Getter
@Builder
public class EvaluationDto {

    private String grammar;
    private String context;
    private String review;
    private String situation;


}