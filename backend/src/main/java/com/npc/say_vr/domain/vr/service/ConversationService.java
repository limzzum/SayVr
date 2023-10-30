package com.npc.say_vr.domain.vr.service;

import com.npc.say_vr.domain.vr.dto.ConversationRequestDto.CreateConversationRequestDto;
import com.npc.say_vr.domain.vr.dto.ConversationResponseDto.ConversationDto;
import com.npc.say_vr.domain.vr.dto.ConversationResponseDto.ConversationListResponseDto;
import com.npc.say_vr.domain.vr.dto.ConversationResponseDto.ProficiencyInfoResponseDto;

public interface ConversationService {

    ProficiencyInfoResponseDto readProficiency(Long userId);

    ConversationDto createConversation(Long userId,
        CreateConversationRequestDto createConversationRequestDto);

    ConversationListResponseDto readMyConversationList(Long userId);

    ConversationDto readConversation(Long userId, Long conversationId);


}
