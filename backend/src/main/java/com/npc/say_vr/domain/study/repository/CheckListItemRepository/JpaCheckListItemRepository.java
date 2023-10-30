package com.npc.say_vr.domain.study.repository.CheckListItemRepository;

import com.npc.say_vr.domain.study.domain.ChecklistItem;
import com.npc.say_vr.domain.study.domain.StudyMember;
import org.springframework.data.jpa.repository.JpaRepository;

public interface JpaCheckListItemRepository extends JpaRepository<ChecklistItem, Long> {
}
