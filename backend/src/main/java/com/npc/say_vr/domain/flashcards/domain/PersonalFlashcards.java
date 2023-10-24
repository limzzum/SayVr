package com.npc.say_vr.domain.flashcards.domain;

import com.npc.say_vr.domain.flashcards.constant.FlashcardStatus;
import com.npc.say_vr.domain.user.domain.User;
import javax.persistence.DiscriminatorValue;
import javax.persistence.Entity;
import javax.persistence.EnumType;
import javax.persistence.Enumerated;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import lombok.AccessLevel;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Entity
@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@DiscriminatorValue("personal")
public class PersonalFlashcards extends Flashcards {

    @ManyToOne
    @JoinColumn(name = "user_id")
    private User user;

    @Enumerated(value = EnumType.STRING)
    private FlashcardStatus status;
    private String tag;
    private Integer forkCount;

}
