package com.npc.say_vr.domain.vr.domain;

import com.npc.say_vr.global.entity.BaseEntity;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import lombok.AccessLevel;
import lombok.Getter;
import lombok.NoArgsConstructor;
import org.hibernate.validator.constraints.Range;

@Entity
@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class Message extends BaseEntity {

    @Id
    @GeneratedValue
    @Column(name = "talk_id")
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "conversation_id")
    private Conversation conversation;

    //TODO: confirm
    private String role;// system or user or assistant
    private String content; // 대사

    @Range(min = 0, max = 100)
    private Integer grammar;
    @Range(min = 0, max = 100)
    private Integer context;
    @Range(min = 0, max = 100)
    private Integer pronunciation;
}
