package com.npc.say_vr.domain.study.domain;

import javax.persistence.DiscriminatorValue;
import javax.persistence.Entity;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Size;
import lombok.AccessLevel;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Entity
@DiscriminatorValue("PERSONAL")
@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class PersonalChecklist extends Checklist {

  @NotNull
  @Size(max = 30)
  private String context;
}
