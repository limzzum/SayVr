package com.npc.say_vr.domain.vr.service;

import com.npc.say_vr.domain.vr.domain.Conversation;
import com.npc.say_vr.domain.vr.domain.Talk;
import com.npc.say_vr.domain.vr.repository.ConversationRepository;
import java.util.List;
import java.util.Optional;
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

    //TODO: 생성은 어떻게 할 것인지,, 채점 메소드 GPT, 우선은 생성해서 저장하는 부분만 생각하기
    @Override
    public Conversation createConversation(Long userId) {

        return null;
    }

    @Override
    public List<Conversation> readMyConversationList(Long userId) {
        return conversationRepository.findByUser_Id(userId);
    }

    //유저 확인을 또 해줄 필요가 있을까??Long userId,
    @Override
    public Optional<Conversation> readConversation(Long conversationId) {
        return conversationRepository.findById(conversationId);
    }

    @Override
    public Talk create(Long userId) {
        return null;
    }
}
