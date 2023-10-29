package com.npc.say_vr.domain.vr.service;

import com.npc.say_vr.domain.vr.dto.ConversationRequestDto.CreateConversationRequestDto;
import com.npc.say_vr.domain.vr.dto.ConversationResponseDto.ConversationInfoResponseDto;
import com.npc.say_vr.domain.vr.dto.ConversationResponseDto.ConversationListResponseDto;
import com.npc.say_vr.domain.vr.dto.ConversationResponseDto.ProficiencyInfoResponseDto;

public interface ConversationService {

    ProficiencyInfoResponseDto readProficiency(Long userId);

    ConversationInfoResponseDto createConversation(Long userId,
        CreateConversationRequestDto createConversationRequestDto);

    ConversationListResponseDto readMyConversationList(Long userId);

    ConversationInfoResponseDto readConversation(Long userId, Long conversationId);


}
