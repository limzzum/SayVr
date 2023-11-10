package com.npc.say_vr.domain.study.dto.responseDto;

import com.npc.say_vr.domain.study.constant.CheckListStatus;
import com.npc.say_vr.domain.study.constant.OptionCheckItem;
import com.npc.say_vr.domain.study.constant.OptionType;
import com.npc.say_vr.domain.study.domain.ChecklistItem;
import com.querydsl.core.annotations.QueryProjection;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@AllArgsConstructor
@Data
@NoArgsConstructor
@Builder
public class CheckListItemDto {
    private Long checkListId;
    private CheckListStatus checkListStatus;
    private OptionCheckItem optionCheckItem;
    private String description;
    private int goalCount;
    private OptionType optionType;
    private int currentCount;

    public CheckListItemDto toDto(ChecklistItem checklistItem, int goal_count,OptionType optionType) {
        return CheckListItemDto.builder()
                .checkListId(checklistItem.getId())
                .checkListStatus(checklistItem.getCheckListStatus())
                .optionCheckItem(checklistItem.getOptionCheckItem())
                .description(checklistItem.getDescription())
                .goalCount(goal_count)
                .optionType(optionType)
                .currentCount(checklistItem.getCurrent_count())
                .build();
    }

    @QueryProjection
    public CheckListItemDto(Long checkListId, CheckListStatus checkListStatus,
        OptionCheckItem optionCheckItem, String description, int goal_count, int current_count, OptionType optionType) {
        this.checkListId = checkListId;
        this.checkListStatus = checkListStatus;
        this.optionCheckItem = optionCheckItem;
        this.description = description;
        this.goalCount = goal_count;
        this.currentCount = current_count;
        this.optionType = optionType;
    }
}
