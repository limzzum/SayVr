package com.npc.say_vr.global.dto;

import com.npc.say_vr.global.error.constant.ErrorCode;
import lombok.Getter;
import lombok.ToString;

@Getter
@ToString
public class ErrorResponseDto {

  private String success;
  private int status;
  private String errorCode;
  private String message;

  public ErrorResponseDto(ErrorCode errorCode) {
    this.success = "fail";
    this.status = errorCode.getStatusCode();
    this.errorCode = errorCode.getErrorCode();
    this.message = errorCode.getMessage();
  }

}
