package com.npc.say_vr.domain.study.dto.responseDto;

import java.util.List;
import lombok.Builder;
import lombok.Getter;

@Getter
public class StudyListResponseDto {
    List<StudyInfoDto> studyInfoDtoList;

    @Builder
    public StudyListResponseDto(List<StudyInfoDto> studyInfoDtoList) {
        this.studyInfoDtoList = studyInfoDtoList;
    }
}
