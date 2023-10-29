package com.npc.say_vr.domain.study.dto.responseDto;

import com.npc.say_vr.domain.study.constant.OptionType;
import com.npc.say_vr.domain.study.domain.Goal;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@Builder
@AllArgsConstructor
public class GoalResponseDto {
    private Long goalId;
    private OptionType optionType;
    private int count;
    private String description;

    public GoalResponseDto toDto(Goal goal) {
        return GoalResponseDto.builder()
                .goalId(goal.getId())
                .optionType(goal.getOptionType())
                .count(goal.getCount())
                .description(goal.getDescription())
                .build();
    }
}
