package com.npc.say_vr.domain.vr.dto;

import com.npc.say_vr.domain.vr.domain.Conversation;
import java.time.LocalDateTime;
import java.util.List;
import lombok.Builder;
import lombok.Getter;

public class ConversationResponseDto {

    @Getter
    public static class ProficiencyInfoResponseDto {

        private Long userId;// 필요한가?
        private Integer average;
        private Integer averagePronunciation;
        private Integer averageContext;
        private Integer averageGrammar;

        @Builder
        public ProficiencyInfoResponseDto(Long userId, Integer average,
            Integer averagePronunciation, Integer averageContext, Integer averageGrammar) {
            this.average = average;
            this.averageContext = averageContext;
            this.averageGrammar = averageGrammar;
            this.averagePronunciation = averagePronunciation;
        }
    }

    //TODO: 전부 풀어서 전달하는 게 사용하기 좋을까? 프론트 관점에서 고민해보기
    @Getter
    public static class ConversationInfoResponseDto {

        private LocalDateTime createdDate;
        private Conversation conversation;
//        private List<Message> messages;

        @Builder
        public ConversationInfoResponseDto(Conversation conversation, LocalDateTime createdDate) {
            this.conversation = conversation;
            this.createdDate = createdDate;
        }

    }

    @Getter
    public static class ConversationListResponseDto {

        private List<Conversation> conversationList;

        @Builder
        public ConversationListResponseDto(List<Conversation> conversationList) {
            this.conversationList = conversationList;
        }
    }

}
