package com.npc.say_vr.domain.study.dto.responseDto;

import com.npc.say_vr.domain.flashcards.constant.FlashcardStatus;
import com.npc.say_vr.domain.study.domain.StudyDeck;
import com.querydsl.core.annotations.QueryProjection;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@Builder
@Getter
public class StudyDeckInfo {

    private Long studyDeckId;
    private String name;
    private Long flashcardDeckId;
    private int wordCount;

    // TODO : N + 1 개선
    public StudyDeckInfo(StudyDeck studyDeck) {
        this.studyDeckId = studyDeck.getId();
        this.name = studyDeck.getName();
        this.flashcardDeckId = studyDeck.getFlashcardDeck().getId();
        this.wordCount = studyDeck.getWordCount();
    }

    @QueryProjection
    public StudyDeckInfo(Long studyDeckId, String name, Long flashcardDeckId, int wordCount) {
        this.studyDeckId = studyDeckId;
        this.name = name;
        this.flashcardDeckId = flashcardDeckId;
        this.wordCount = wordCount;
    }
}
