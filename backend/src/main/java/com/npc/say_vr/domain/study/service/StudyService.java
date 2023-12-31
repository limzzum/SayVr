package com.npc.say_vr.domain.study.service;

import com.npc.say_vr.domain.study.dto.requestDto.CreateStudyRequestDto;
import com.npc.say_vr.domain.study.dto.requestDto.StudySliceRequestDto;
import com.npc.say_vr.domain.study.dto.requestDto.UpdateStudyRequestDto;
import com.npc.say_vr.domain.study.dto.responseDto.StudyDetailResponseDto;
import com.npc.say_vr.domain.study.dto.responseDto.StudyEnterResponseDto;
import com.npc.say_vr.domain.study.dto.responseDto.StudyListResponseDto;
import com.npc.say_vr.domain.study.dto.responseDto.StudyMineListResponseDto;

public interface StudyService {
  StudyEnterResponseDto createStudy(Long userId, CreateStudyRequestDto createStudyRequestDto);
  StudyDetailResponseDto readStudy(Long userId, Long studyId);

  StudyMineListResponseDto readStudyMineList(Long userId);

  StudyEnterResponseDto joinStudy(Long userId, Long studyId);

  void deleteStudyMember(Long userId, Long studyId);

  StudyDetailResponseDto updateStudy(Long userId, Long studyId, UpdateStudyRequestDto updateStudyRequestDto);

  StudyListResponseDto readStudyAllList(Long userId);

  StudyListResponseDto readStudyKeyWord(Long userId, StudySliceRequestDto studySliceRequestDto);


}
