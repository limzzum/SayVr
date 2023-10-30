package com.npc.say_vr.domain.study.dto.requestDto;

import java.time.LocalDate;
import java.util.List;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@Builder
@AllArgsConstructor
public class CreateGoalsRequestDto {
    private LocalDate startDate;
    private List<CreateGoalRequestDto> goalDtoList;
}
