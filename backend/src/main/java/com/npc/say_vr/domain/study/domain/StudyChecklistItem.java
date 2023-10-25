package com.npc.say_vr.domain.study.domain;

import javax.persistence.DiscriminatorValue;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.validation.constraints.NotNull;
import lombok.AccessLevel;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Entity
@DiscriminatorValue("STUDY")
@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class StudyChecklistItem extends ChecklistItem{

  @ManyToOne(fetch = FetchType.LAZY)
  @JoinColumn(name = "goal_id")
  private Goal goal;

  @NotNull
  private int current_count;

}
