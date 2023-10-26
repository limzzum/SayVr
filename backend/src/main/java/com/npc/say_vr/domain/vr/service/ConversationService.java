package com.npc.say_vr.domain.vr.service;

import com.npc.say_vr.domain.vr.domain.Conversation;
import com.npc.say_vr.domain.vr.domain.Talk;
import java.util.List;
import java.util.Optional;

public interface ConversationService {

    Conversation createConversation(Long userId);

    List<Conversation> readMyConversationList(Long userId);

    Optional<Conversation> readConversation(Long conversationId);

    Talk create(Long userId);


}
