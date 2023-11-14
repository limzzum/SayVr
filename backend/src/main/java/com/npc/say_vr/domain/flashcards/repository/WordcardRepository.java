package com.npc.say_vr.domain.flashcards.repository;

import com.npc.say_vr.domain.flashcards.constant.WordcardStatus;
import com.npc.say_vr.domain.flashcards.domain.Wordcard;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

public interface WordcardRepository extends JpaRepository<Wordcard, Long> {

    Wordcard findByFlashcardDeck_IdAndWord_IdAndStatusIsNot(Long flashcardDeckId, Long wordId,
        WordcardStatus status);
    
    @Query(value = "SELECT wordcard_id FROM wordcard WHERE flashcard_deck_id = :deckId ORDER BY RAND(:seed) LIMIT 1", nativeQuery = true)
    Long findRandomWordcardIdByDeckId(@Param("deckId") Long deckId, @Param("seed") Long seed);

    @Query(value = "SELECT wordcard_id FROM wordcard WHERE flashcard_deck_id = :deckId ORDER BY RAND() LIMIT 1", nativeQuery = true)
    Long findRandomWordcardIdByDeckId(@Param("deckId") Long deckId);

}
