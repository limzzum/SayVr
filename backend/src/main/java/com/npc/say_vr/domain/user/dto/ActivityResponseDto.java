package com.npc.say_vr.domain.user.dto;

import java.util.List;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@AllArgsConstructor
@Data
@NoArgsConstructor
@Builder
public class ActivityResponseDto {

  private List<ActivityDto> activityDtoList;

}
