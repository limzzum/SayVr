package com.npc.say_vr.domain.study.domain;

import com.npc.say_vr.domain.study.constant.OptionType;
import com.npc.say_vr.global.entity.BaseEntity;
import java.util.List;
import javax.persistence.Column;
import javax.persistence.DiscriminatorColumn;
import javax.persistence.Entity;
import javax.persistence.EnumType;
import javax.persistence.Enumerated;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Inheritance;
import javax.persistence.InheritanceType;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.OneToMany;
import javax.validation.constraints.Min;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Size;
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
public class Goal extends BaseEntity {

  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  @Column(name = "goal_id")
  private Long id;

  @NotNull
  @Min(1)
  private int count;

  @Enumerated(EnumType.STRING)
  private OptionType optionType;

  @ManyToOne(fetch = FetchType.LAZY)
  @JoinColumn(name = "weeklySprint_id")
  private WeeklySprint weeklySprint;

  @OneToMany(mappedBy = "goal")
  private List<ChecklistItem> checklistItemList;

  @Size(max = 30)
  private String description;

  public void updateGoal(int count) {
    this.count = count;
  }

  public void updateETCGoal(String description) {
    this.description = description;
  }

  public void updateStatus(OptionType optionType) {
    this.optionType = optionType;
  }

}
