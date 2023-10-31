package com.npc.say_vr.domain.vr.repository;

import com.npc.say_vr.domain.vr.domain.Message;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface MessageRepository extends JpaRepository<Message, Long> {


}
