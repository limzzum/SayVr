package com.npc.say_vr.domain.vr.service;

import com.npc.say_vr.domain.vr.dto.ConversationRequestDto.CreateConversationRequestDto;
import com.npc.say_vr.domain.vr.dto.ConversationRequestDto.MonthlyListRequestDto;
import com.npc.say_vr.domain.vr.dto.ConversationResponseDto.ConversationDatedListDto;
import com.npc.say_vr.domain.vr.dto.ConversationResponseDto.ConversationDto;
import com.npc.say_vr.domain.vr.dto.ConversationResponseDto.ConversationInfoResponseDto;
import com.npc.say_vr.domain.vr.dto.ConversationResponseDto.ConversationListResponseDto;
import com.npc.say_vr.domain.vr.dto.ConversationResponseDto.ProficiencyInfoResponseDto;

public interface ConversationService {

    ProficiencyInfoResponseDto readProficiency(Long userId);

    ConversationDto createConversation(Long userId,
        CreateConversationRequestDto createConversationRequestDto);

    ConversationListResponseDto readMyConversationList(Long userId);
    ConversationDatedListDto readMonthlyConversationList(Long userId, int year, int month);

    ConversationInfoResponseDto readConversation(Long userId, Long conversationId);


}
