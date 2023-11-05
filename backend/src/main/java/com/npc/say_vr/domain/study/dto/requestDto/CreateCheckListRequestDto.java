package com.npc.say_vr.domain.study.dto.requestDto;

import lombok.Getter;

@Getter
public class CreateCheckListRequestDto {

  private Long studyMemberId;
  private String description;
}
