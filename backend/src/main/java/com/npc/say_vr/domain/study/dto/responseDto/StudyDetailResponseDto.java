package com.npc.say_vr.domain.study.dto.responseDto;

import com.npc.say_vr.domain.study.constant.StudyRole;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@Builder
@Getter
public class StudyDetailResponseDto {

    private StudyInfoDto studyInfoDto;
    private Long memberId;
    private StudyRole studyRole;
    private String nickName;


    @Builder
    public StudyDetailResponseDto(StudyInfoDto studyInfoDto, Long memberId, StudyRole studyRole,String nickName) {
        this.studyInfoDto = studyInfoDto;
        this.memberId = memberId;
        this.studyRole = studyRole;
        this.nickName = nickName;
    }
}
