package com.npc.say_vr.domain.vr.dto;

import com.fasterxml.jackson.annotation.JsonProperty;
import java.util.List;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

public class ChatResponseDto {

    @NoArgsConstructor
    @AllArgsConstructor
    @Getter
    public static class ChatResponse {

        private List<Choice> choices;
    }

    @NoArgsConstructor
    @AllArgsConstructor
    @Getter
    @Builder
    public static class Choice {

        private int index;
        @JsonProperty("message")
        private OpenAIMessageDto openAIMessageDto;

        @JsonProperty("finish_reason")  // Include other fields if needed
        private String finishReason;


    }
}
