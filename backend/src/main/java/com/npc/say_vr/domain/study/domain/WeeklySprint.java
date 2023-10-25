package com.npc.say_vr.domain.study.domain;

import com.npc.say_vr.global.entity.BaseEntity;
import java.time.LocalDate;
import java.util.List;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.OneToMany;
import javax.validation.constraints.NotNull;
import lombok.AccessLevel;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Entity
@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class WeeklySprint extends BaseEntity {

  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  @Column(name = "weeklySprint_id")
  private Long id;

  @NotNull
  private LocalDate targetDate;

  @ManyToOne(fetch = FetchType.LAZY)
  @JoinColumn(name = "study_id")
  private Study study;

  @OneToMany(mappedBy = "weeklySprint")
  private List<ChecklistItem> checklistItemList;

  @OneToMany(mappedBy = "weeklySprint")
  private List<Goal> Goal;

}
