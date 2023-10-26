package com.npc.say_vr.domain.study.domain;


import com.npc.say_vr.domain.flashcards.domain.FlashcardDeck;
import com.npc.say_vr.domain.user.domain.User;
import com.npc.say_vr.global.constant.Status;
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
import javax.persistence.OneToOne;
import lombok.AccessLevel;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Entity
@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class StudyDeck {

  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  @Column(name = "studyDeck_id")
  private Long id;

  @Enumerated(EnumType.STRING)
  private Status status;

  @ManyToOne(fetch = FetchType.LAZY)
  @JoinColumn(name = "study_id")
  private Study study;

  @OneToOne
  @JoinColumn(name = "flashcards_id")
  private FlashcardDeck flashcardDeck;

}
