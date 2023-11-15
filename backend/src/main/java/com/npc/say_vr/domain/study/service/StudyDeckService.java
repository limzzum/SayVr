package com.npc.say_vr.domain.study.service;

import com.npc.say_vr.domain.flashcards.dto.FlashcardsResponseDto.MessageOnlyResponseDto;
import com.npc.say_vr.domain.study.dto.requestDto.CreateStudytDeckRequestDto;
import com.npc.say_vr.domain.study.dto.requestDto.CreateWordcardRequestDto;
import com.npc.say_vr.domain.study.dto.requestDto.UpdateStudyDeckRequestDto;
import com.npc.say_vr.domain.study.dto.responseDto.StudyDeckDetailResponseDto;
import com.npc.say_vr.domain.study.dto.responseDto.StudyDeckInfo;
import com.npc.say_vr.domain.study.dto.responseDto.StudyDeckOneDetailResponseDto;
import com.npc.say_vr.domain.study.dto.responseDto.WordUpdateResponseDto;

public interface StudyDeckService {

    StudyDeckInfo createStudyDeck(Long userId, Long studyId, CreateStudytDeckRequestDto createStudytDeckRequestDto);

    StudyDeckDetailResponseDto readStudyDeckList(Long userId, Long studyId);

    void updateStudyDeck(Long userId, Long studyId, UpdateStudyDeckRequestDto updateStudyDeckRequestDto);

    MessageOnlyResponseDto deleteStudyDeck(Long userId, Long studyId, Long studyDeckId);

    StudyDeckOneDetailResponseDto readStudyDeckDetail(Long userId, Long studyId, Long studyDeckId);

    WordUpdateResponseDto createWordcard(Long userId, Long studyId, Long studyDeckId, CreateWordcardRequestDto createWordcardRequestDto);

    MessageOnlyResponseDto deleteWordcard(Long userId, Long studyDeckId,Long wordcardId);
}
