package com.npc.say_vr.domain.study.dto.requestDto;

import lombok.Getter;

@Getter
public class UpdateCheckListRequestDto {
  private Long studyMemberId;
  private String description;
}
