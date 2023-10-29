package com.npc.say_vr.domain.flashcards.domain;

import com.npc.say_vr.domain.flashcards.constant.FlashcardStatus;
import com.npc.say_vr.domain.flashcards.constant.SavingProgressStatus;
import com.npc.say_vr.domain.user.domain.User;
import java.util.ArrayList;
import java.util.List;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.EnumType;
import javax.persistence.Enumerated;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.OneToMany;
import javax.persistence.OneToOne;
import javax.validation.constraints.NotNull;
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
public class PersonalDeck {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "personal_deck_id")
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id")
    private User user;
    @NotNull
    private String name;

    @OneToOne
    @JoinColumn(name = "flashcards_id")
    private FlashcardDeck flashcardDeck;

    @Enumerated(value = EnumType.STRING)
    private FlashcardStatus status;

    @Enumerated(value = EnumType.STRING)
    private SavingProgressStatus savingProgressStatus;

    @OneToMany(mappedBy = "personalDeck")
    private List<DeckTag> tags = new ArrayList<>();

    private Integer forkCount;

    private Integer wordCount;

    public void updateWordCount(int count) {
        this.wordCount = count;
    }

    public void updateForkCount() {
        this.forkCount += 1;
    }

    public void updateSavingProgress(SavingProgressStatus status) {
        this.savingProgressStatus = status;
    }

    public void updateStatus(FlashcardStatus status) {
        this.status = status;
    }

    public void updateName(String name) {
        this.name = name;
    }

    public void updateTags(List<DeckTag> tags) {
        this.tags = tags;
    }


    public void updateFlashcardDeck(FlashcardDeck deck) {
        this.flashcardDeck = deck;
    }

}
