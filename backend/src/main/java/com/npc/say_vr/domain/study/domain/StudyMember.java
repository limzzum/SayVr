package com.npc.say_vr.domain.study.domain;

import com.npc.say_vr.domain.study.constant.StudyRole;
import com.npc.say_vr.domain.user.domain.User;
import com.npc.say_vr.global.constant.Status;
import com.npc.say_vr.global.entity.BaseEntity;
import java.util.List;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.EnumType;
import javax.persistence.Enumerated;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.OneToMany;
import lombok.AccessLevel;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Entity
@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class StudyMember extends BaseEntity {

  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  @Column(name = "study_member_id")
  private Long id;

  @Enumerated(EnumType.STRING)
  private Status status;

  @Enumerated(EnumType.STRING)
  private StudyRole studyRole;

  @ManyToOne(fetch = FetchType.LAZY)
  @JoinColumn(name = "user_id")
  private User user;

  @ManyToOne(fetch = FetchType.LAZY)
  @JoinColumn(name = "study_id")
  private Study study;

  @OneToMany(mappedBy = "studyMember")
  private List<ChecklistItem> checklistItemList;

  @Builder
  public StudyMember(Status status, StudyRole studyRole, User user,Study study) {
    this.status = status;
    this.studyRole = studyRole;
    this.user = user;
    this.study = study;
  }

  public void updateStatus(Status status) {
    this.status = status;
  }

  public void updateStudyRole(StudyRole studyRole) {
    this.studyRole = studyRole;
  }





}
