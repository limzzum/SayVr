package com.npc.say_vr.domain.study.dto.responseDto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@Builder
public class StudyPageDetailResponseDto {

    private StudyDetailResponseDto studyDetailResponseDto;
    private WeeklySprintDetailResponse weeklySprintDetailResponse;
    private StudyDeckDetailResponseDto studyDeckDetailResponseDto;

    @Builder
    public StudyPageDetailResponseDto(StudyDetailResponseDto studyDetailResponseDto,
                                      WeeklySprintDetailResponse weeklySprintDetailResponse,
                                      StudyDeckDetailResponseDto studyDeckDetailResponseDto) {
        this.studyDetailResponseDto = studyDetailResponseDto;
        this.weeklySprintDetailResponse = weeklySprintDetailResponse;
        this.studyDeckDetailResponseDto = studyDeckDetailResponseDto;
    }
}
