package com.npc.say_vr.domain.vr.service;

import com.npc.say_vr.domain.user.domain.User;
import com.npc.say_vr.domain.user.repository.UserRepository;
import com.npc.say_vr.domain.vr.domain.Conversation;
import com.npc.say_vr.domain.vr.dto.ConversationRequestDto.CreateConversationRequestDto;
import com.npc.say_vr.domain.vr.dto.ConversationResponseDto.ConversationInfoResponseDto;
import com.npc.say_vr.domain.vr.dto.ConversationResponseDto.ConversationListResponseDto;
import com.npc.say_vr.domain.vr.dto.ConversationResponseDto.ProficiencyInfoResponseDto;
import com.npc.say_vr.domain.vr.repository.ConversationRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Slf4j
@Service
@RequiredArgsConstructor
@Transactional(readOnly = true)
public class ConversationServiceImpl implements ConversationService {

    private final ConversationRepository conversationRepository;
    private final UserRepository userRepository;

    @Override
    public ProficiencyInfoResponseDto readProficiency(Long userId) {
        return ProficiencyInfoResponseDto.builder().build();
    }

    //TODO: 생성은 어떻게 할 것인지,, 채점 메소드 GPT, 우선은 생성해서 저장하는 부분만 생각하기

    @Override
    public ConversationInfoResponseDto createConversation(Long userId,
        CreateConversationRequestDto createConversationRequestDto) {
        User user = userRepository.findById(userId).orElseThrow();
        //TODO: how to rate the proficiency? and when to add them to the entity
        Conversation conversation = Conversation.builder()
            .messageList(createConversationRequestDto.getMessages())
            .review("review place holder")
            .averageContext(100)
            .averageGrammar(50)
            .averagePronunciation(75)
            .situation("test api")
            .user(user)
            .build();
        conversation = conversationRepository.save(conversation);
        return ConversationInfoResponseDto.builder()
            .createdDate(conversation.getCreatedAt())
            .conversation(conversation)
            .build();
        //TODO: check if the returned dto contains ID
    }


    @Override
    public ConversationListResponseDto readMyConversationList(Long userId) {
        return ConversationListResponseDto.builder()
            .conversationList(conversationRepository.findByUser_Id(userId))
            .build();
    }
    //유저 확인을 또 해줄 필요가 있을까??Long userId,

    @Override
    public ConversationInfoResponseDto readConversation(Long userId, Long conversationId) {
        Conversation conversation = conversationRepository.findById(conversationId).orElseThrow();
        return ConversationInfoResponseDto.builder()
            .conversation(conversation)
            .createdDate(conversation.getCreatedAt())
            .build();
    }


}
