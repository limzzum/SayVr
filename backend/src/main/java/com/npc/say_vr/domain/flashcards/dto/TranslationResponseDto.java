package com.npc.say_vr.domain.flashcards.dto;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor
@AllArgsConstructor
public class TranslationResponseDto {
    private Message message;

    @Getter
    @NoArgsConstructor
    @AllArgsConstructor
    public static class Message {
        private String type;
        private String service;
        private String version;
        private Result result;
    }

    @Getter
    @NoArgsConstructor
    @AllArgsConstructor
    public static class Result {
        private String srcLangType;
        private String tarLangType;
        private String translatedText;
    }
}