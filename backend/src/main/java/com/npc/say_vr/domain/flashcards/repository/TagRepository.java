package com.npc.say_vr.domain.flashcards.repository;

import com.npc.say_vr.domain.flashcards.domain.Tag;
import org.springframework.data.jpa.repository.JpaRepository;

public interface TagRepository extends JpaRepository<Tag, Long> {

    Tag findByContent(Long userId);


}
