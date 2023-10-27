package com.npc.say_vr.domain.flashcards.domain;

import com.npc.say_vr.domain.study.domain.StudyDeck;
import com.npc.say_vr.global.entity.BaseEntity;
import java.util.ArrayList;
import java.util.List;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.OneToMany;
import javax.persistence.OneToOne;
import lombok.AccessLevel;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Entity
@Getter
@Builder
@AllArgsConstructor
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class FlashcardDeck extends BaseEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "flashcard_deck_id")
    private Long id;

    @OneToMany(mappedBy = "flashcardDeck")
    private List<Wordcard> wordcards = new ArrayList<>();

    @OneToOne(mappedBy = "flashcardDeck")
    private PersonalDeck personalDeck;

    @OneToOne(mappedBy = "flashcardDeck")
    private StudyDeck studyDeck;

    public void updatePersonalDeck(PersonalDeck personalDeck) {
        this.personalDeck = personalDeck;
    }

}
