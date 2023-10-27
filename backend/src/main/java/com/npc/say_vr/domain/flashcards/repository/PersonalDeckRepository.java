package com.npc.say_vr.domain.flashcards.repository;

import com.npc.say_vr.domain.flashcards.domain.PersonalDeck;
import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;

public interface PersonalDeckRepository extends JpaRepository<PersonalDeck, Long> {
    
    List<PersonalDeck> findByUser_Id(Long userId);


}
