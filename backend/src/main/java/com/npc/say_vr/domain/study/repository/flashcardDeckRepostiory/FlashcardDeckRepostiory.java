package com.npc.say_vr.domain.study.repository.flashcardDeckRepostiory;

import com.npc.say_vr.domain.flashcards.domain.FlashcardDeck;
import java.util.Optional;

public interface FlashcardDeckRepostiory {

    FlashcardDeck findByStudyDeckId(Long studyDeckId);

    FlashcardDeck save(FlashcardDeck flashcardDeck);
}
