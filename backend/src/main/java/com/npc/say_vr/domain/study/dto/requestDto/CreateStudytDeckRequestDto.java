package com.npc.say_vr.domain.study.dto.requestDto;

import com.npc.say_vr.domain.flashcards.constant.FlashcardStatus;
import com.npc.say_vr.domain.flashcards.domain.FlashcardDeck;
import com.npc.say_vr.domain.flashcards.domain.PersonalDeck;
import com.npc.say_vr.domain.study.domain.Study;
import com.npc.say_vr.domain.study.domain.StudyDeck;
import com.npc.say_vr.global.constant.Status;
import lombok.Getter;

@Getter
public class CreateStudytDeckRequestDto {

    private String name;

    public StudyDeck createStudyDeck(Study Study, FlashcardDeck flashcardDeck) {
        return StudyDeck.builder()
                .study(Study)
                .name(name)
                .flashcardDeck(flashcardDeck)
                .status(Status.ACTIVE)
                .build();
    }
}
