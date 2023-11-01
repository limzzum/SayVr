package com.npc.say_vr.domain.study.domain;

import com.npc.say_vr.domain.study.constant.CheckListStatus;
import com.npc.say_vr.domain.study.constant.OptionCheckItem;
import com.npc.say_vr.domain.user.domain.User;
import com.npc.say_vr.global.entity.BaseEntity;
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
public class ChecklistItem  extends BaseEntity {

  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  @Column(name = "checklistItem_id")
  private Long id;

  @Enumerated(EnumType.STRING)
  private CheckListStatus checkListStatus;

  @Enumerated(EnumType.STRING)
  private OptionCheckItem optionCheckItem;

  @NotNull
  @Size(max = 30)
  private String description;

  @ManyToOne(fetch = FetchType.LAZY)
  @JoinColumn(name = "goal_id")
  private Goal goal;

  @NotNull
  private int current_count;

  @ManyToOne(fetch = FetchType.LAZY)
  @JoinColumn(name = "study_member_id")
  private StudyMember studyMember;

  @ManyToOne(fetch = FetchType.LAZY)
  @JoinColumn(name = "weeklySprint_id")
  private WeeklySprint weeklySprint;

  public void updateDescriptionAndStatus(CheckListStatus checkListStatus,String description) {
    this.checkListStatus = checkListStatus;
    this.description = description;
  }

  public void updateCheckListStatus(CheckListStatus checkListStatus) {
    this.checkListStatus = checkListStatus;
  }

  public void updateDescription(String description) {
    this.description = description;
  }

}
