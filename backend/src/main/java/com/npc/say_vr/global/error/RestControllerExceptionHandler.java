package com.npc.say_vr.global.error;

import com.npc.say_vr.global.dto.ResponseDto;
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
    // TODO exception errorCode 처리
    @ExceptionHandler(Exception.class)
    public ResponseEntity<?> handleException(Exception e){
        logging(e);
        e.printStackTrace();
//        ErrorCode serverError = CommonErrorCode.SERVER_ERROR;
//        return ResponseFactory.fail(e.getMessage(), serverError.getErrorCode(),serverError.getStatusCode());
        return null;
    }

    private static void logging(Exception e){
        log.warn("[ERROR]"+e.getMessage());
    }
}
