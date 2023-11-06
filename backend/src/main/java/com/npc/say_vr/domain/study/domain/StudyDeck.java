package com.npc.say_vr.domain.study.domain;


import com.npc.say_vr.domain.flashcards.constant.FlashcardStatus;
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
import javax.validation.constraints.NotNull;
import lombok.AccessLevel;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
@AllArgsConstructor
@Builder
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

  @NotNull
  private String name;

  private int wordCount;

  @ManyToOne(fetch = FetchType.LAZY)
  @JoinColumn(name = "study_id")
  private Study study;

  @OneToOne(fetch = FetchType.LAZY)
  @JoinColumn(name = "flashcards_id")
  private FlashcardDeck flashcardDeck;

  public void updateWordCount(int count) {
    this.wordCount = count;
  }

  public void updateStatus(Status status) {
    this.status = status;
  }

  public void updateName(String name) {
    this.name = name;
  }

}
