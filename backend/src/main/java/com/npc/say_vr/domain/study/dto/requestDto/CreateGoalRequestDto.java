package com.npc.say_vr.domain.study.dto.requestDto;

import com.npc.say_vr.domain.study.constant.OptionType;
import lombok.Getter;

@Getter
public class CreateGoalRequestDto {
        private OptionType optionType;
        private int count;
        private String description;
}
