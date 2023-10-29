package com.npc.say_vr.domain.study.dto.common;

import com.npc.say_vr.domain.study.constant.CheckListStatus;
import com.npc.say_vr.domain.study.constant.OptionCheckItem;
import com.npc.say_vr.domain.study.domain.ChecklistItem;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@Builder
@AllArgsConstructor
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
}
