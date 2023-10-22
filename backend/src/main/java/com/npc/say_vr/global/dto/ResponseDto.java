package com.npc.say_vr.global.dto;

import lombok.AccessLevel;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor(access = AccessLevel.PRIVATE)
public class ResponseDto<T> {

    private String message;
    private T data;

    @Builder
    public ResponseDto(String message, T data){
        this.message = message;
        this.data = data;
    }

}
