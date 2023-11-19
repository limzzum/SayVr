package com.npc.say_vr.domain.study.constant;

import com.npc.say_vr.global.error.constant.ErrorCode;

public enum StudyErrorCode implements ErrorCode {
    STUDY_NOT_FOUND("존재하지 않는 스터디입니다","STUDY_001",400),
    WEEKLYSPRINT_NOT_FOUND("존재하지 않는 스프린트입니다","STUDY_002",400),
    GOAL_NOT_FOUND("존재하지 않는 목표입니다","STUDY_003",400),
    CHECKLIST_NOT_FOUND("존재하지 않는 체크리스트입니다","STUDY_004",400),
    STUDY_ACCESS_DENIED("해당 스터디에 접근할 수 없습니다.","STUDY_005",400),
    WEEKLYSPRINT_ACCESS_DENIED("해당 스프린트에 접근할 수 없습니다.","STUDY_006",400),
    GOAL_ACCESS_DENIED("해당 목표에 접근할 수 없습니다.","STUDY_007",400),

    CHECKLIST_ACCESS_DENIED("해당 체크리스트에 접근할 수 없습니다.","STUDY_008",400),
    STUDYMEMBER_NOT_FOUND("존재하지 않는 스터디 회원입니다","STUDY_009",400),
    GOAL_OPTION_EXIST_FONUD("이미 존재하는 목표 옵션입니다.","STUDY_010",400),
    STUDYDECK_NOT_FOUND("존재하지 않는 스터디단어장입니다","STUDY_011",400),

    STUDYDECKWORD_NOT_FOUND("존재하지 않는 단어장 단어입니다","STUDY_012",400),

    STUDY_FULL_MEMBER("스터디 최대인원이 차서 가입할 수 없습니다.","STUDY_013",400),

    STUDYMEMBER_NO_LTUPDATE("스터디 수정인원은 현재인원보다 적으면 안됩니다..","STUDY_014",400);
    private String message;
    private String errorCode;
    private int statusCode;

    StudyErrorCode(String message, String errorCode, int statusCode) {
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

