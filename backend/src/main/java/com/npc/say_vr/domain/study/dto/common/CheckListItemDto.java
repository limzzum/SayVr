package com.npc.say_vr.domain.study.dto.common;

import com.npc.say_vr.domain.study.constant.CheckListStatus;
import com.npc.say_vr.domain.study.constant.OptionCheckItem;
import com.npc.say_vr.domain.study.domain.ChecklistItem;
import com.querydsl.core.annotations.QueryProjection;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@Builder
public class CheckListItemDto {
    private Long checkListId;
    private CheckListStatus checkListStatus;
    private OptionCheckItem optionCheckItem;
    private String description;
    private int goal_count;
    private int current_count;

    public CheckListItemDto toDto(ChecklistItem checklistItem, int goal_count) {
        return CheckListItemDto.builder()
                .checkListId(checklistItem.getId())
                .checkListStatus(checklistItem.getCheckListStatus())
                .optionCheckItem(checklistItem.getOptionCheckItem())
                .description(checklistItem.getDescription())
                .goal_count(goal_count)
                .current_count(checklistItem.getCurrent_count())
                .build();
    }

    @QueryProjection
    public CheckListItemDto(Long checkListId, CheckListStatus checkListStatus,
        OptionCheckItem optionCheckItem, String description, int goal_count, int current_count) {
        this.checkListId = checkListId;
        this.checkListStatus = checkListStatus;
        this.optionCheckItem = optionCheckItem;
        this.description = description;
        this.goal_count = goal_count;
        this.current_count = current_count;
    }
}
