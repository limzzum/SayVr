package com.npc.say_vr.domain.study.service;

import com.npc.say_vr.domain.study.dto.requestDto.CreateStudyRequestDto;
import com.npc.say_vr.domain.study.dto.responseDto.StudyDetailResponseDto;

public interface StudyService {
  StudyDetailResponseDto createStudy(Long userId, CreateStudyRequestDto createStudyRequestDto);
  StudyDetailResponseDto readStudy(Long userId, Long studyId);
}
