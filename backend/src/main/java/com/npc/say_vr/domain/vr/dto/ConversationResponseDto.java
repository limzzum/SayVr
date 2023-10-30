package com.npc.say_vr.domain.vr.dto;

import com.npc.say_vr.domain.vr.domain.Conversation;
import com.npc.say_vr.domain.vr.domain.Message;
import com.npc.say_vr.domain.vr.domain.Score;
import java.time.LocalDateTime;
import java.util.List;
import java.util.stream.Collectors;
import lombok.Builder;
import lombok.Getter;

public class ConversationResponseDto {

    @Getter
    public static class ScoreDto {

        private Integer grammarTotal;
        private Integer contextTotal;
        private Integer pronunciationTotal;
        private Integer averageTotal;
        private LocalDateTime createdAt;

        public ScoreDto(
            Integer grammarTotal,
            Integer contextTotal,
            Integer pronunciationTotal,
            Integer averageTotal,
            LocalDateTime createdAt) {
            this.grammarTotal = grammarTotal;
            this.contextTotal = contextTotal;
            this.pronunciationTotal = pronunciationTotal;
            this.averageTotal = averageTotal;
            this.createdAt = createdAt;
        }

        @Builder
        public ScoreDto(Score score) {
            this.grammarTotal = score.getGrammarTotal();
            this.contextTotal = score.getContextTotal();
            this.pronunciationTotal = score.getPronunciationTotal();
            this.averageTotal = score.getAverageTotal();
            this.createdAt = score.getCreatedAt();
        }

    }

    @Getter
    public static class ProficiencyInfoResponseDto {

        //        private LocalDateTime date;
        private List<ScoreDto> scoreHistory;
        private ScoreDto averageScore;

        @Builder
        public ProficiencyInfoResponseDto(List<ScoreDto> scoreHistory, ScoreDto averageScore) {
            this.scoreHistory = scoreHistory;
            this.averageScore = averageScore;
        }

//        @Builder
//        public ProficiencyInfoResponseDto(List<ScoreDto> scoreHistory, ScoreDto averageScore,
//            LocalDateTime date) {
//            this.scoreHistory = scoreHistory;
//            this.date = date;
//            this.averageScore = averageScore;
//        }
    }

    //TODO: 전부 풀어서 전달하는 게 사용하기 좋을까? 프론트 관점에서 고민해보기
    @Getter
    public static class ConversationInfoResponseDto {

        private LocalDateTime createdDate;
        private ConversationDto conversation;
//        private List<Message> messages;

        @Builder
        public ConversationInfoResponseDto(ConversationDto conversation,
            LocalDateTime createdDate) {
            this.conversation = conversation;
            this.createdDate = createdDate;
        }

    }

    @Getter
    public static class ConversationListResponseDto {

        private List<ConversationDto> conversationList;

        @Builder
        public ConversationListResponseDto(List<ConversationDto> conversationList) {
            this.conversationList = conversationList;
        }
    }

    @Getter
    public static class MessageDto {

        private Long id;
        private Long conversationId;
        private String role;
        private String content;
        private Integer grammar;
        private Integer context;
        private Integer pronunciation;

        public MessageDto(Message message) {
            this.id = message.getId();
            this.conversationId = message.getConversation().getId();
            this.role = message.getRole();
            this.content = message.getContent();
            this.grammar = message.getGrammar();
            this.context = message.getContext();
            this.pronunciation = message.getPronunciation();
        }
    }

    @Getter
    public static class ConversationDto {

        private Long id;
        private List<MessageDto> messageList;
        private String review;
        private String situation;
        private Integer conversationGrammar;
        private Integer conversationContext;
        private Integer conversationPronunciation;
        private LocalDateTime createdAt;

        @Builder
        public ConversationDto(Conversation conversation, List<Message> messageList) {
            this.id = conversation.getId();
            this.createdAt = conversation.getCreatedAt();
            this.conversationContext = conversation.getConversationContext();
            this.conversationPronunciation = conversation.getConversationPronunciation();
            this.conversationGrammar = conversation.getConversationGrammar();
            this.situation = conversation.getSituation();
            this.review = conversation.getReview();
            this.messageList = messageList.stream()
                .map(MessageDto::new)
                .collect(Collectors.toList());

        }

    }

}
