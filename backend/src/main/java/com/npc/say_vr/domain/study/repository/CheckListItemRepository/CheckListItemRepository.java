package com.npc.say_vr.domain.study.repository.CheckListItemRepository;

import com.npc.say_vr.domain.study.constant.OptionType;
import com.npc.say_vr.domain.study.domain.ChecklistItem;
import com.npc.say_vr.domain.study.dto.responseDto.CheckListItemDto;
import java.time.LocalDate;
import java.util.List;
import java.util.Optional;

public interface CheckListItemRepository {
  ChecklistItem save(ChecklistItem checklistItem);

  List<CheckListItemDto> findByWeeklySprintIdAndStudyId(Long weeklySprintId, Long studyMemberId);

  Optional<ChecklistItem> findById(Long checkListId);

  List<ChecklistItem> findByUserIdAndOptiontype(Long userId, OptionType optionType, LocalDate today);

}
