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
@DiscriminatorValue("ETC")
@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class ETCGoal extends Goal{

  @NotNull
  @Size(max = 30)
  private String description;

}
