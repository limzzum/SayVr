package com.npc.say_vr.domain.study.repository.flashcardDeckRepostiory;

import static com.npc.say_vr.domain.flashcards.domain.QFlashcardDeck.flashcardDeck;
import static com.npc.say_vr.domain.study.domain.QChecklistItem.checklistItem;
import static com.npc.say_vr.domain.study.domain.QGoal.goal;

import com.npc.say_vr.domain.flashcards.domain.FlashcardDeck;
import com.npc.say_vr.domain.study.constant.OptionType;
import com.npc.say_vr.global.constant.Status;
import com.querydsl.jpa.impl.JPAQueryFactory;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Repository;

@RequiredArgsConstructor
@Repository
public class QueryDslFlashcardDeckRepostiory {

    private final JPAQueryFactory jpaQueryFactory;


    public FlashcardDeck findByStudyDeckId(Long studyDeckId) {
        return jpaQueryFactory.selectFrom(flashcardDeck)
                .where(flashcardDeck.studyDeck.id.eq(studyDeckId),flashcardDeck.studyDeck.status.eq(Status.ACTIVE))
                .fetchOne();
    }
}
