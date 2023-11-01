package com.npc.say_vr.domain.study.dto.responseDto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@Builder
@AllArgsConstructor
public class WeeklySprintDetailResponse {
  private Long preWeeklySprintId;
  private Long nextWeeklySprintId;
  private GoalDetailResponseDto goalDetailResponseDto;

}
