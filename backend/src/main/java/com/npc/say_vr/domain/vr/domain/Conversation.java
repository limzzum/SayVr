package com.npc.say_vr.domain.vr.domain;

import com.npc.say_vr.domain.user.domain.User;
import com.npc.say_vr.global.entity.BaseEntity;
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
import lombok.AccessLevel;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import org.hibernate.validator.constraints.Range;

@Entity
@Getter
@Builder
@AllArgsConstructor
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class Conversation extends BaseEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "conversation_id")
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id")
    private User user;

    @OneToMany(mappedBy = "conversation")
    private List<Message> messageList;

//    @OneToOne(fetch = FetchType.LAZY, mappedBy = "conversation")
//    private Score score;

    @Column(name = "review", length = 1000)
    private String review;
    private String situation;

    @Range(min = 0, max = 100)
    private int conversationGrammar;
    @Range(min = 0, max = 100)
    private int conversationContext;
    @Range(min = 0, max = 100)
    private int conversationPronunciation;

    public void updateMessageList(List<Message> messageList) {
        this.messageList = messageList;
    }

    public void updateConversationGrammar(int score) {
        this.conversationGrammar = score;
    }

    public void updateConversationContext(int score) {
        this.conversationContext = score;
    }

    public void updateReview(String review) {
        this.review = review;
    }

    public void updateSituation(String situation) {
        this.situation = situation;
    }
}
