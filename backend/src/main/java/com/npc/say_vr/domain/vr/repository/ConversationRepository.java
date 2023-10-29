package com.npc.say_vr.domain.vr.repository;

import com.npc.say_vr.domain.vr.domain.Conversation;
import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ConversationRepository extends JpaRepository<Conversation, Long> {

    List<Conversation> findByUser_Id(Long userId);

}
