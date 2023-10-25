package com.npc.say_vr.domain.flashcards.domain;

import com.npc.say_vr.domain.flashcards.constant.FlashcardStatus;
import com.npc.say_vr.domain.user.domain.User;
import java.util.ArrayList;
import java.util.List;
import javax.persistence.CollectionTable;
import javax.persistence.Column;
import javax.persistence.ElementCollection;
import javax.persistence.Entity;
import javax.persistence.EnumType;
import javax.persistence.Enumerated;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.OneToOne;
import lombok.AccessLevel;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Entity
@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class PersonalFlashcards {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "personal_flashcards_id")
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id")
    private User user;

    @OneToOne
    @JoinColumn(name = "flashcards_id")
    private Flashcards flashcards;

    @Enumerated(value = EnumType.STRING)
    private FlashcardStatus status;

    @ElementCollection
    @CollectionTable(name = "personal_flashcards_tags", joinColumns = @JoinColumn(name = "personal_flashcards_id"))
    @Column(name = "tag")
    private List<String> tags = new ArrayList<>();

    private Integer forkCount;

}
