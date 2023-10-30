package com.npc.say_vr.domain.study.repository.CheckListItemRepository;

import com.npc.say_vr.domain.study.domain.ChecklistItem;
import com.npc.say_vr.domain.study.dto.common.CheckListItemDto;
import java.util.List;

public interface CheckListItemRepository {
  ChecklistItem save(ChecklistItem checklistItem);

  List<CheckListItemDto> findByWeeklySprintIdAndStudyId(Long weeklySprintId, Long studyMemberId);

}
