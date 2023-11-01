package com.npc.say_vr.domain.flashcards.repository;

import com.npc.say_vr.domain.flashcards.constant.WordcardStatus;
import com.npc.say_vr.domain.flashcards.domain.Wordcard;
import org.springframework.data.jpa.repository.JpaRepository;

public interface WordcardRepository extends JpaRepository<Wordcard, Long> {

    Wordcard findByFlashcardDeck_IdAndWord_IdAndStatusIsNot(Long flashcardDeckId, Long wordId,
        WordcardStatus status);

}
