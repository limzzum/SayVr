package com.npc.say_vr.domain.vr.dto;

import com.fasterxml.jackson.databind.ObjectMapper;
import java.io.DataInput;
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

//    @NoArgsConstructor
//    @AllArgsConstructor
//    @Getter
//    @Builder
//    public class EvaluationDto {
//        private int grammar;
//        private int context;
//        private String review;
//        private String situation;
//    }
    @NoArgsConstructor
    @Getter
    @Builder
    public static class Choice {
        private int index;
        private OpenAIMessageDto openAIMessageDto;

        public Choice(int index, OpenAIMessageDto openAIMessageDto) {
            this.index = index;
            this.openAIMessageDto = openAIMessageDto;
        }

        public EvaluationDto getEval(){
            ObjectMapper objectMapper = new ObjectMapper();
            try {
                EvaluationDto evaluationDto = objectMapper.readValue((DataInput) openAIMessageDto,EvaluationDto.class);

                // Now 'yourObject' is an instance of YourClassType with values from the JSON string.
            } catch (Exception e) {
                e.printStackTrace();
            }
            return EvaluationDto.builder().build();
        }
    }
}
