package com.npc.say_vr.domain.study.dto.responseDto;

import java.util.List;
import lombok.Builder;
import lombok.Getter;

@Getter
public class StudyMineListResponseDto {
  List<StudyInfoDto> studyInfoDtoList;

  @Builder
  public StudyMineListResponseDto(List<StudyInfoDto> studyInfoDtoList) {
    this.studyInfoDtoList = studyInfoDtoList;
  }
}
