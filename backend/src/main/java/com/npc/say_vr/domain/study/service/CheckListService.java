package com.npc.say_vr.domain.study.service;

import com.npc.say_vr.domain.study.dto.requestDto.CreateCheckListRequestDto;
import com.npc.say_vr.domain.study.dto.requestDto.UpdateCheckListRequestDto;

public interface CheckListService {

  void createCheckListItem(Long studyId, Long weeklySprintId, CreateCheckListRequestDto createCheckListRequestDto);
  void updateCheckListItem(Long checkListId, UpdateCheckListRequestDto updateCheckListRequestDto);

}
