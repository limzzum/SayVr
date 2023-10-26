package com.npc.say_vr.domain.study.service;

import com.npc.say_vr.domain.study.dto.StudyRequestDto.CreateStudyRequestDto;
import com.npc.say_vr.domain.study.dto.StudyResponseDto.StudyDetailInfoResponseDto;

public interface StudyService {
  StudyDetailInfoResponseDto createStudy(Long userId, CreateStudyRequestDto createStudyRequestDto);

}
