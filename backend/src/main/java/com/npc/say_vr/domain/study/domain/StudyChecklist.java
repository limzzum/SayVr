package com.npc.say_vr.domain.study.domain;

import com.npc.say_vr.domain.study.constant.GoalOption;
import javax.persistence.DiscriminatorValue;
import javax.persistence.Entity;
import javax.persistence.EnumType;
import javax.persistence.Enumerated;
import javax.persistence.FetchType;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import lombok.AccessLevel;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Entity
@DiscriminatorValue("STUDY")
@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class StudyChecklist extends Checklist{

  @ManyToOne(fetch = FetchType.LAZY)
  @JoinColumn(name = "goal_id")
  private Goal goal;

}
