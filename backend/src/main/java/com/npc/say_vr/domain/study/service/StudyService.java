package com.npc.say_vr.domain.study.service;

import com.npc.say_vr.domain.study.dto.requestDto.CreateStudyRequestDto;
import com.npc.say_vr.domain.study.dto.requestDto.UpdateStudyRequestDto;
import com.npc.say_vr.domain.study.dto.responseDto.StudyDetailResponseDto;
import com.npc.say_vr.domain.study.dto.responseDto.StudyMineListResponseDto;

public interface StudyService {
  StudyDetailResponseDto createStudy(Long userId, CreateStudyRequestDto createStudyRequestDto);
  StudyDetailResponseDto readStudy(Long userId, Long studyId);

  StudyMineListResponseDto readStudyMineList(Long userId);

  StudyDetailResponseDto joinStudy(Long userId, Long studyId);

  void deleteStudyMember(Long userId, Long studyId);

  StudyDetailResponseDto updateStudy(Long userId, Long studyId, UpdateStudyRequestDto updateStudyRequestDto);


}
