package com.npc.say_vr.domain.study.domain;


import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
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

}
