package com.npc.say_vr.domain.user.constant;

import lombok.Getter;
import lombok.RequiredArgsConstructor;

@Getter
@RequiredArgsConstructor
public enum UserResponseMessage {
    LOGIN_SUCCESS("로그인 성공"),
    LOGIN_FAIL("로그인 실패"),
    ACCESS_TOKEN_EXPIRED("토큰 만료됨"),
    CREATE_ACCESS_TOKEN("새로운 토큰이 발급되었습니다"),
    SUCCESS_GET_USER_INFO("유저 정보 조회 성공"),
    FAIL_GET_USER_INFO("유저 정보 조회 실패"),
    NOT_VALID_REFRESH_TOKEN("유효하지 않은 토큰입니다"),
    SUCCESS_PROFILE_UPDATE("프로필 사진이 업데이트 되었습니다."),
    SUCCESS_NAME_UPDATE("닉네임 변경 완료"),
    SUCCESS_USER_DELETE("탈퇴가 완료되었습니다");


    private final String message;

}
