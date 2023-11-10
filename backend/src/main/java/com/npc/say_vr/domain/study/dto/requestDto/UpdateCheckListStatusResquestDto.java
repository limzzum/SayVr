package com.npc.say_vr.domain.study.dto.requestDto;

import com.npc.say_vr.domain.study.constant.CheckListStatus;
import lombok.Getter;

@Getter
public class UpdateCheckListStatusResquestDto {
    private Long studyMemberId;
    private CheckListStatus checkListStatus;
}
