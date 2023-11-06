package com.npc.say_vr.domain.study.repository.flashcardDeckRepostiory;

import com.npc.say_vr.domain.flashcards.domain.FlashcardDeck;
import com.npc.say_vr.domain.study.repository.studyDeckRepository.JpaStudyDeckRepository;
import com.npc.say_vr.domain.study.repository.studyDeckRepository.QueryDslStudyDeckRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Repository;

@Repository
@RequiredArgsConstructor
public class FlashcardDeckRepostioryImpl implements FlashcardDeckRepostiory{

    private final JpaFlashcardDeckRepostiory jpaFlashcardDeckRepostiory;
    private final QueryDslFlashcardDeckRepostiory queryDslFlashcardDeckRepostiory;


    @Override
    public FlashcardDeck findByStudyDeckId(Long studyDeckId) {
        return queryDslFlashcardDeckRepostiory.findByStudyDeckId(studyDeckId);
    }

    @Override
    public FlashcardDeck save(FlashcardDeck flashcardDeck) {
        return jpaFlashcardDeckRepostiory.save(flashcardDeck);
    }
}
