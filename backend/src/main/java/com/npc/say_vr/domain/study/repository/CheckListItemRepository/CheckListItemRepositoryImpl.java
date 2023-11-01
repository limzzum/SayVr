package com.npc.say_vr.domain.study.repository.CheckListItemRepository;

import com.npc.say_vr.domain.study.domain.ChecklistItem;
import com.npc.say_vr.domain.study.dto.common.CheckListItemDto;
import java.util.List;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Repository;

@Repository
@RequiredArgsConstructor
public class CheckListItemRepositoryImpl implements CheckListItemRepository {

  private final JpaCheckListItemRepository jpaCheckListItemRepository;
  private final QueryDslCheckListItemRepository queryDslCheckListItemRepository;
  @Override
  public ChecklistItem save(ChecklistItem checklistItem) {
    return jpaCheckListItemRepository.save(checklistItem);
  }

  @Override
  public List<CheckListItemDto> findByWeeklySprintIdAndStudyId(Long weeklySprintId,
      Long studyMemberId) {
    return queryDslCheckListItemRepository.findByWeeklySprintIdAndStudyId(weeklySprintId,studyMemberId);
  }
}
