package com.npc.say_vr.domain.vr.domain;

import com.npc.say_vr.global.entity.BaseEntity;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import lombok.AccessLevel;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.ColumnDefault;
import org.hibernate.validator.constraints.Range;

@Entity
@Getter
@Builder
@AllArgsConstructor
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class Message extends BaseEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "message_id")
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "conversation_id")
    private Conversation conversation;

    //TODO: confirm
    private String role;// system or user or assistant
    private String content; // 대사
    @ColumnDefault("0")
    @Range(min = 0, max = 100)
    private int grammar;
    @ColumnDefault("0")
    @Range(min = 0, max = 100)
    private int context;
    @ColumnDefault("0")
    @Range(min = 0, max = 100)
    private int pronunciation;

    public void updateConversation(Conversation conversation) {
        this.conversation = conversation;
    }

}
