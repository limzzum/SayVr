package com.npc.say_vr.global.dto;

import lombok.AccessLevel;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import org.springframework.http.HttpStatus;

@Getter
@NoArgsConstructor(access = AccessLevel.PRIVATE)
public class ResponseDto<T> {

    private String message;
    private T data;
    private HttpStatus httpStatus;

    @Builder
    public ResponseDto(String message, T data, HttpStatus httpStatus){
        this.message = message;
        this.data = data;
        this.httpStatus = httpStatus;
    }

}
