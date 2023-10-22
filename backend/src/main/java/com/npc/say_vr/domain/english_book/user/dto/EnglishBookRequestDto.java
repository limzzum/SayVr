package com.npc.say_vr.domain.english_book.user.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

public class EnglishBookRequestDto {

    @Data
    @Builder
    @NoArgsConstructor
    @AllArgsConstructor
    public static class CreateEnglishBookRequestDto {
        private Long userId;

    }
}
