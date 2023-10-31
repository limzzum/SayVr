package com.npc.say_vr.domain.study.dto.responseDto;

import com.npc.say_vr.domain.study.dto.common.CheckListItemDto;
import java.util.ArrayList;
import java.util.List;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@Builder
@AllArgsConstructor
public class MemberCheckListResponseDto {
    private Long studyMemberId;
    private String nickName;
    // TODO : 배열 초기화
    List<CheckListItemDto> checkListItemDtoList = new ArrayList<>();
}
