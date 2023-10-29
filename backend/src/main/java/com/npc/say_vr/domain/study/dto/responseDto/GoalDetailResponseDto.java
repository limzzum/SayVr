package com.npc.say_vr.domain.study.dto.responseDto;

import com.npc.say_vr.domain.study.dto.common.CheckListItemDto;
import java.time.LocalDate;
import java.util.List;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@Builder
@AllArgsConstructor
public class GoalDetailResponseDto {
    private Long weeklySprintId;
    private LocalDate targetDate;
    private List<GoalResponseDto> goalDtoList;
    private List<MemberCheckListResponseDto> memberCheckListResponseDtoList;

}
