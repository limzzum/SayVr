package com.npc.say_vr.domain.study.domain;

import com.npc.say_vr.domain.study.constant.StudyStatus;
import com.npc.say_vr.global.constant.Status;
import com.npc.say_vr.global.entity.BaseEntity;
import java.util.List;
import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.EnumType;
import javax.persistence.Enumerated;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.OneToMany;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Size;
import lombok.AccessLevel;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import org.hibernate.validator.constraints.Range;

@AllArgsConstructor
@Builder
@Entity
@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class Study extends BaseEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "study_id")
    private Long id;

    @Size(min = 2, max = 20)
    @NotNull
    private String name;

    @Range(min = 2, max=10)
    @NotNull
    private int maxPeople;

    private int currentPeople;

    @Size(max=1000)
    private String description;

    @Size(max = 100)
    private String rule;

    @Enumerated(EnumType.STRING)
    private StudyStatus studyStatus;

    @OneToMany(mappedBy = "study" )
    private List<StudyMember> studyMembers;

    @OneToMany(mappedBy = "study")
    private List<WeeklySprint> weeklySprints;

}
