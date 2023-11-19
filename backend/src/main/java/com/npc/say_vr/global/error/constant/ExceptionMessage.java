package com.npc.say_vr.global.error.constant;

import lombok.Getter;
import lombok.RequiredArgsConstructor;

@Getter
@RequiredArgsConstructor
public enum ExceptionMessage implements ErrorCode{
    INVALID_INPUT("잘못된 입력 값입니다.","COM_001",400),
    UN_AUTHORIZATION("인증이 필요합니다.","COM_002",401),
    FORBIDDEN("권한이 필요합니다", "COM_003",403),
    NOT_FOUND_RESOURCE("해당 자원을 찾을 수 없습니다","COM_004", 404),
    SERVER_ERROR("서버의 상태가 이상합니다","COM_005",500),
    NOT_VALID_TOKEN("유효하지 않은 토큰입니다.","COM_006",401),
    NOT_ALLOW_USER("인증되지 않은 사용자입니다.","COM_007",401),
    NOT_VERIFIED_USER("유저 정보가 일치하지 않습니다.","COM_008",401),
    FILE_SIZE_LIMIT_EXCEEDED("파일 사이즈가 제한 크기를 초과합니다","COM_009",400);

    private String message;
    private String errorCode;
    private int statusCode;
    ExceptionMessage(String message, String errorCode, int statusCode) {
        this.message = message;
        this.errorCode = errorCode;
        this.statusCode = statusCode;
    }

    @Override
    public String getMessage() {
        return message;
    }

    @Override
    public String getErrorCode() {
        return errorCode;
    }

    @Override
    public int getStatusCode() {
        return statusCode;
    }
}
