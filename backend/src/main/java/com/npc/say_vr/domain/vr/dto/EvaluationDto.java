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
    private int grammarScore;
    private int contextScore;
    private String review;
    private String situation;
//public static class EvaluationDto{
//
//}


}