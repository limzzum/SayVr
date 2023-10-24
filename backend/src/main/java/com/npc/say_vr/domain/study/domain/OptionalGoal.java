package com.npc.say_vr.domain.study.domain;

import com.npc.say_vr.domain.study.constant.GoalOption;
import javax.persistence.Column;
import javax.persistence.DiscriminatorValue;
import javax.persistence.Entity;
import javax.persistence.EnumType;
import javax.persistence.Enumerated;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import lombok.AccessLevel;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Entity
@DiscriminatorValue("OPTIONAL")
@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class OptionalGoal extends Goal {

  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  @Column(name = "optionalGoal_id")
  private Long id;

  @Enumerated(EnumType.STRING)
  private GoalOption goalOption;

}
