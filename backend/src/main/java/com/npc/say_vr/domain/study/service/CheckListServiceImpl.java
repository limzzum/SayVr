package com.npc.say_vr.domain.study.service;

import static com.npc.say_vr.domain.study.constant.StudyErrorCode.CHECKLIST_NOT_FOUND;
import static com.npc.say_vr.domain.study.constant.StudyErrorCode.STUDYMEMBER_NOT_FOUND;
import static com.npc.say_vr.domain.study.constant.StudyErrorCode.WEEKLYSPRINT_NOT_FOUND;

import com.npc.say_vr.domain.study.constant.CheckListStatus;
import com.npc.say_vr.domain.study.constant.OptionCheckItem;
import com.npc.say_vr.domain.study.constant.OptionType;
import com.npc.say_vr.domain.study.domain.ChecklistItem;
import com.npc.say_vr.domain.study.domain.StudyMember;
import com.npc.say_vr.domain.study.domain.WeeklySprint;
import com.npc.say_vr.domain.study.dto.requestDto.CreateCheckListRequestDto;
import com.npc.say_vr.domain.study.dto.requestDto.UpdateCheckListRequestDto;
import com.npc.say_vr.domain.study.dto.requestDto.UpdateCheckListStatusResquestDto;
import com.npc.say_vr.domain.study.exception.StudyException;
import com.npc.say_vr.domain.study.repository.CheckListItemRepository.CheckListItemRepository;
import com.npc.say_vr.domain.study.repository.WeeklySprintRepository.WeeklySprintRepository;
import com.npc.say_vr.domain.study.repository.studyMemberRepository.StudyMemberRepository;
import java.time.LocalDate;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Slf4j
@Service
@RequiredArgsConstructor
@Transactional(readOnly = true)
public class CheckListServiceImpl implements CheckListService {

  private final WeeklySprintRepository weeklySprintRepository;
  private final StudyMemberRepository studyMemberRepository;
  private final CheckListItemRepository checkListItemRepository;

  @Transactional
  @Override
  public void createCheckListItem(Long studyId, Long weeklySprintId, CreateCheckListRequestDto createCheckListRequestDto) {
    WeeklySprint weeklySprint = weeklySprintRepository.findById(weeklySprintId).orElseThrow(()-> new StudyException(WEEKLYSPRINT_NOT_FOUND));
    // TODO : 예외처리
    StudyMember studyMember = studyMemberRepository.findById(createCheckListRequestDto.getStudyMemberId()).orElseThrow(() -> new StudyException(STUDYMEMBER_NOT_FOUND));

    ChecklistItem checklistItem = ChecklistItem.builder()
        .checkListStatus(CheckListStatus.ONGOING)
        .optionCheckItem(OptionCheckItem.PERSONAL)
        .description(createCheckListRequestDto.getDescription())
        .current_count(0)
        .studyMember(studyMember)
        .weeklySprint(weeklySprint)
        .build();

    checkListItemRepository.save(checklistItem);

  }
  @Transactional
  @Override
  public void updateCheckListItem(Long checkListId, UpdateCheckListRequestDto updateCheckListRequestDto) {
    // TODO : 예외처리 & studymemberid나 그런걸로 예외처리 같이 해도 좋겠다
    ChecklistItem checklistItem =  checkListItemRepository.findById(checkListId).orElseThrow(()-> new StudyException(CHECKLIST_NOT_FOUND));
    checklistItem.updateDescription(updateCheckListRequestDto.getDescription());
  }
  @Transactional
  @Override
  public void updateCheckListItemStatus(Long checkListId,
                                        UpdateCheckListStatusResquestDto updateCheckListStatusResquestDto) {
    // TODO : 여러번 눌렀을 때 처리!
    // TODO : 예외처리 & studymemberid나 그런걸로 예외처리 같이 해도 좋겠다
    ChecklistItem checklistItem =  checkListItemRepository.findById(checkListId).orElseThrow(()-> new StudyException(CHECKLIST_NOT_FOUND));
    checklistItem.updateCheckListStatus(updateCheckListStatusResquestDto.getCheckListStatus());
  }
  @Transactional
  @Override
  public void deleteCheckListItemStatus(Long checkListId) {
    // TODO : 예외처리 & studymemberid나 그런걸로 예외처리 같이 해도 좋겠다
    ChecklistItem checklistItem =  checkListItemRepository.findById(checkListId).orElseThrow(()-> new StudyException(CHECKLIST_NOT_FOUND));
    checklistItem.updateCheckListStatus(CheckListStatus.DELETE);
  }

}
