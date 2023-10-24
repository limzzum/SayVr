package com.npc.say_vr.domain.flashcards.repository;

import com.npc.say_vr.domain.flashcards.domain.Flashcards;
import org.springframework.data.jpa.repository.JpaRepository;

public interface FlashcardsRepository extends JpaRepository<Flashcards, Long> {

}
