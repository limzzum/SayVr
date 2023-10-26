package com.npc.say_vr.domain.vr.dto;

import com.npc.say_vr.domain.game.domain.Ranking;
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
        public ProficiencyInfoResponseDto(Ranking ranking) {

        }
    }

    @Getter
    public static class ConversationInfoResponseDto {
//        private String date;

        @Builder
        public ConversationInfoResponseDto() {
        }

    }
}
