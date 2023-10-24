package com.npc.say_vr.domain.study.domain;

import javax.persistence.Column;
import javax.persistence.DiscriminatorValue;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Size;
import lombok.AccessLevel;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Entity
@DiscriminatorValue("NONE")
@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class NoneGoal extends Goal{
  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  @Column(name = "noneGoal_id")
  private Long id;

  @NotNull
  @Size(max = 30)
  private String description;

}
