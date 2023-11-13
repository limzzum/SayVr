package com.npc.say_vr.domain.vr.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor
@AllArgsConstructor
public class OpenAIMessageDto {

    private String role;
    private String content;

    public String toString() {
        return "{\"role\": \"" + role + "\", \"content\":\"" + content + "\"}";
    }


}
