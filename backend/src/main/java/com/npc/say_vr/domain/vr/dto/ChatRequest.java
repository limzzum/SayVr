package com.npc.say_vr.domain.vr.dto;

import java.util.ArrayList;
import java.util.List;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class ChatRequest {

    private String model;
    //    private String type;
    private List<OpenAIMessageDto> messages;
    private int n;
    private double temperature;

    public ChatRequest(String model, String prompt) {
        this.model = model;

        this.messages = new ArrayList<>();
        this.messages.add(new OpenAIMessageDto("user", prompt));
    }

    // getters and setters
}