package com.npc.say_vr.global.error;

import com.npc.say_vr.global.dto.ResponseDto;
import com.npc.say_vr.global.error.exception.NotFoundException;
import com.npc.say_vr.global.error.exception.NotVerifiedUserException;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.bind.annotation.RestControllerAdvice;

@RestControllerAdvice(annotations = RestController.class)
public class RestControllerExceptionHandler {

    @ExceptionHandler({NotFoundException.class})
    public ResponseEntity<ResponseDto<?>> handleNotFoundException(
        IllegalArgumentException exception) {
        return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(
            ResponseDto.builder().message(exception.getMessage()).build()
        );
    }


    @ExceptionHandler({NotVerifiedUserException.class})
    public ResponseEntity<ResponseDto<?>> handleUserException(
        IllegalArgumentException exception) {
        return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(
            ResponseDto.builder().message(exception.getMessage()).build()
        );
    }
}
