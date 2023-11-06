package com.npc.say_vr.domain.study.repository.flashcardDeckRepostiory;

import com.npc.say_vr.domain.flashcards.domain.FlashcardDeck;
import com.npc.say_vr.domain.study.domain.StudyDeck;
import java.util.Optional;
import org.springframework.data.jpa.repository.JpaRepository;

public interface JpaFlashcardDeckRepostiory extends JpaRepository<FlashcardDeck, Long> {
}
