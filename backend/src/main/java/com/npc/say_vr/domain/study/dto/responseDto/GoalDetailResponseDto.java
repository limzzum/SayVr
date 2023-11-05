package com.npc.say_vr.domain.study.dto.responseDto;

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
public class GoalDetailResponseDto {
    private Long weeklySprintId;
    private LocalDate targetDate;
    // TODO : 배열초기화
    private List<GoalResponseDto> goalDtoList;
    private List<MemberCheckListResponseDto> memberCheckListResponseDtoList;

}
