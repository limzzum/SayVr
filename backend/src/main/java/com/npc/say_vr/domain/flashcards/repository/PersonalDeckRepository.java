package com.npc.say_vr.domain.flashcards.repository;

import com.npc.say_vr.domain.flashcards.constant.FlashcardStatus;
import com.npc.say_vr.domain.flashcards.domain.PersonalDeck;
import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;

public interface PersonalDeckRepository extends JpaRepository<PersonalDeck, Long> {

    List<PersonalDeck> findByStatusIsNotAndStatusIsNotAndStatusIs(FlashcardStatus deletedStatus,
        FlashcardStatus forkedStatus,
        FlashcardStatus status);

    List<PersonalDeck> findByUser_Id(Long userId);

    List<PersonalDeck> findByUser_IdAndStatusIsNot(Long userId, FlashcardStatus status);

    List<PersonalDeck> findByNameContaining(String keyword);

//    List<PersonalDeck> findByTagsContainingAndTags(List<DeckTag> tags);


}
