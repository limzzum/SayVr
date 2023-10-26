package com.npc.say_vr.domain.vr.repository;

import com.npc.say_vr.domain.vr.domain.Talk;
import java.util.List;
import java.util.Optional;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface TalkRepository extends JpaRepository<Talk, Long> {

    List<Talk> findByConversation_Id(Long conversationId);

    Optional<Talk> findById(Long talkId);


}
