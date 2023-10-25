package com.npc.say_vr.domain.user.domain;

import com.npc.say_vr.domain.study.domain.Checklist;
import com.npc.say_vr.domain.study.domain.StudyMember;
import com.npc.say_vr.domain.user.constant.UserStatus;
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
import javax.persistence.Table;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Size;
import lombok.AccessLevel;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Table(name = "users")
@Entity
@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class User extends BaseEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "user_id")
    private Long id;

    @Size(min = 2, max = 10)
    @NotNull
    private String username;

    @Size(min = 2, max = 10)
    @NotNull
    private String nickname;

    private String profile;

    @Enumerated(EnumType.STRING)
    private UserStatus userStatus;

    @OneToMany(mappedBy = "user")
    private List<StudyMember> studyMembers;

    @OneToMany(mappedBy = "user")
    private List<Checklist> checklists;

    //OAuth용
//    private String provider;
//    private String providerId;

}
