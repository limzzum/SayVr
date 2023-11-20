package com.npc.say_vr.global.error;

import com.npc.say_vr.global.dto.ErrorResponseDto;
import com.npc.say_vr.global.dto.ResponseDto;
import com.npc.say_vr.global.error.constant.ErrorCode;
import com.npc.say_vr.global.error.constant.ExceptionMessage;
import com.npc.say_vr.global.error.exception.CustomException;
import com.npc.say_vr.global.error.exception.NotFoundException;
import com.npc.say_vr.global.error.exception.NotVerifiedUserException;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.bind.annotation.RestControllerAdvice;

@Slf4j
@RestControllerAdvice(annotations = RestController.class)
public class RestControllerExceptionHandler {

    @ExceptionHandler(CustomException.class)
    public ResponseEntity<?> handleCustomException(CustomException e){
        e.printStackTrace();
        logging(e);
        return new ResponseEntity<>(new ErrorResponseDto(e.getErrorCode()),HttpStatus.BAD_REQUEST);
    }

    @ExceptionHandler({NotFoundException.class})
    public ResponseEntity<ResponseDto<?>> handleNotFoundException(
        IllegalArgumentException exception) {
        logging(exception);
        return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(
            ResponseDto.builder().message(exception.getMessage()).build()
        );
    }


    @ExceptionHandler({NotVerifiedUserException.class})
    public ResponseEntity<ResponseDto<?>> handleUserException(
        IllegalArgumentException exception) {
        logging(exception);
        return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(
            ResponseDto.builder().message(exception.getMessage()).build()
        );
    }

    @ExceptionHandler(Exception.class)
    public ResponseEntity<ErrorResponseDto> handleException(Exception e){
        logging(e);
        e.printStackTrace();
        ErrorResponseDto errorResponseDto = new ErrorResponseDto(ExceptionMessage.SERVER_ERROR);
        return new ResponseEntity<>(errorResponseDto, HttpStatus.INTERNAL_SERVER_ERROR);
    }

    private static void logging(Exception e){
        log.warn("[ERROR]"+e.getMessage());
    }
}
