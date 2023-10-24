package com.npc.say_vr.domain.flashcards.domain;

import javax.persistence.DiscriminatorValue;
import javax.persistence.Entity;
import lombok.AccessLevel;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Entity
@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@DiscriminatorValue("personal")
public class PersonalFlashcards extends Flashcards {

    private Long userId;
    private FlashcardStatus status;
    private String tag;
    private Integer forkCount;

}
