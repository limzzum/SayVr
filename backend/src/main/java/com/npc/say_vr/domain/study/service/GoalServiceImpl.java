package com.npc.say_vr.domain.study.service;

import com.npc.say_vr.domain.study.constant.CheckListStatus;
import com.npc.say_vr.domain.study.constant.OptionCheckItem;
import com.npc.say_vr.domain.study.constant.OptionType;
import com.npc.say_vr.domain.study.domain.ChecklistItem;
import com.npc.say_vr.domain.study.domain.Goal;
import com.npc.say_vr.domain.study.domain.Study;
import com.npc.say_vr.domain.study.domain.StudyMember;
import com.npc.say_vr.domain.study.domain.WeeklySprint;
import com.npc.say_vr.domain.study.dto.common.CheckListItemDto;
import com.npc.say_vr.domain.study.dto.requestDto.CreateGoalsRequestDto;
import com.npc.say_vr.domain.study.dto.requestDto.CreateGoalRequestDto;
import com.npc.say_vr.domain.study.dto.requestDto.UpdateGoalRequestDto;
import com.npc.say_vr.domain.study.dto.responseDto.GoalDetailResponseDto;
import com.npc.say_vr.domain.study.dto.responseDto.GoalResponseDto;
import com.npc.say_vr.domain.study.dto.responseDto.MemberCheckListResponseDto;
import com.npc.say_vr.domain.study.repository.CheckListItemRepository.CheckListItemRepository;
import com.npc.say_vr.domain.study.repository.GoalRepository.GoalRepository;
import com.npc.say_vr.domain.study.repository.WeeklySprintRepository.WeeklySprintRepository;
import com.npc.say_vr.domain.study.repository.studyMemberRepository.StudyMemberRepository;
import com.npc.say_vr.domain.study.repository.studyRepository.StudyRepository;
import com.npc.say_vr.global.constant.Status;
import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Slf4j
@Service
@RequiredArgsConstructor
@Transactional(readOnly = true)
public class GoalServiceImpl implements GoalService{

    private final StudyRepository studyRepository;
    private final GoalRepository goalRepository;
    private final CheckListItemRepository checkListItemRepository;
    private final WeeklySprintRepository weeklySprintRepository;
    private final StudyMemberRepository studyMemberRepository;
    @Transactional
    @Override
    public GoalDetailResponseDto createGoal(Long studyId, CreateGoalsRequestDto createGoalsRequestDto) {
        // TODO : 성능개선하기 => 시퀀스 전략 : BATCH INSERT OR JDBCTEMPLATE 전략 => 시간 측정!
        // TODO : checklist 저장하고 가져올 때 성능개선..????
        LocalDate startDate = createGoalsRequestDto.getStartDate();
        List<CreateGoalRequestDto> goalDtoList = createGoalsRequestDto.getGoalDtoList();

        // TODO : 예외처리
        // TODO : QUERYDSL로 STUDY에서 한번에 가져오기 ( + studymember active만 가져오기도 처리 )
        Study study = studyRepository.findById(studyId).orElseThrow();
        List<StudyMember> studyMembers = study.getStudyMembers();

        WeeklySprint weeklySprint = WeeklySprint.builder()
                .targetDate(startDate)
                .study(study)
                .build();

        weeklySprintRepository.save(weeklySprint);
        log.info("weeklySprint 만들기 성공 : " + weeklySprint.getId());

        List<GoalResponseDto> goalResponseDtoList = new ArrayList<>();
        List<MemberCheckListResponseDto> memberCheckListResponseDtoList = new ArrayList<>();
        List<Goal> goalEntityList = new ArrayList<>();

        for(CreateGoalRequestDto createGoalRequestDto : goalDtoList) {
            Goal goal;
            if(createGoalRequestDto.getOptionType().equals(OptionType.ETC)){
                goal = Goal.builder()
                        .count(createGoalRequestDto.getCount())
                        .optionType(createGoalRequestDto.getOptionType())
                        .weeklySprint(weeklySprint)
                        .description(createGoalRequestDto.getDescription())
                        .build();
                goalRepository.save(goal);
            }else {
                goal = Goal.builder()
                        .count(createGoalRequestDto.getCount())
                        .optionType(createGoalRequestDto.getOptionType())
                        .weeklySprint(weeklySprint)
                        .description(createGoalRequestDto.getOptionType().getMessage())
                        .build();
                goalRepository.save(goal);
            }
            goalResponseDtoList.add(new GoalResponseDto().toDto(goal));
            goalEntityList.add(goal);
        }

        // TODO : 2중FOR문 개선하기
        for(StudyMember studyMember : studyMembers) {
            List<CheckListItemDto> checkListItemDtoList = new ArrayList<>();
            MemberCheckListResponseDto memberCheckListResponseDto = MemberCheckListResponseDto
                    .builder()
                    .studyMemberId(studyMember.getId())
                    .checkListItemDtoList(checkListItemDtoList)
                    .build();
            for(Goal goal : goalEntityList) {
                ChecklistItem checklistItem = ChecklistItem.builder()
                        .checkListStatus(CheckListStatus.ONGOING)
                        .optionCheckItem(OptionCheckItem.STUDYGOAL)
                        .description(goal.getDescription())
                        .current_count(0)
                        .goal(goal)
                        .studyMember(studyMember)
                        .weeklySprint(weeklySprint)
                        .build();
                checkListItemRepository.save(checklistItem);
                checkListItemDtoList.add(new CheckListItemDto().toDto(checklistItem, goal.getCount()));
            }
            memberCheckListResponseDtoList.add(memberCheckListResponseDto);
        }

        return GoalDetailResponseDto.builder()
                .weeklySprintId(weeklySprint.getId())
                .targetDate(weeklySprint.getTargetDate())
                .goalDtoList(goalResponseDtoList)
                .memberCheckListResponseDtoList(memberCheckListResponseDtoList)
                .build();

    }

    @Override
    public GoalDetailResponseDto updateGoal(Long studyId,Long weeklySprintId, Long goalId, UpdateGoalRequestDto updateGoalRequestDto) {
        updateGoalAndCheckList(goalId, updateGoalRequestDto);
        return readGoalAndCheckListItem(studyId,weeklySprintId);
    }
    @Transactional
    @Override
    public void updateGoalAndCheckList(Long goalId, UpdateGoalRequestDto updateGoalRequestDto) {
        // TODO 예외처리
        Goal goal = goalRepository.findGoalAndCheckListItem(goalId);
        // TODO : 코드 리팩토링
        if(goal.getOptionType().equals(OptionType.ETC)) {
            goal.updateETCGoal(goal.getCount(), updateGoalRequestDto.getDescription());
            List<ChecklistItem> checklistItemList = goal.getChecklistItemList();
            for(ChecklistItem checklistItem : checklistItemList) {
                CheckListStatus itemStatus;
                if(goal.getCount() <= checklistItem.getCurrent_count()) {
                    itemStatus = CheckListStatus.DONE;
                }else {
                    itemStatus = CheckListStatus.ONGOING;
                }
                checklistItem.updateChecklistItemAndDone(itemStatus, goal.getDescription());
            }
        }else {
            goal.updateGoal(goal.getCount());
            List<ChecklistItem> checklistItemList = goal.getChecklistItemList();
            for(ChecklistItem checklistItem : checklistItemList) {
                CheckListStatus itemStatus;
                if(goal.getCount() <= checklistItem.getCurrent_count()) {
                    itemStatus = CheckListStatus.DONE;
                }else {
                    itemStatus = CheckListStatus.ONGOING;
                }
                checklistItem.updateChecklistItemAndOptional(itemStatus);
            }
        }
    }

    // TODO :1:n 관계로는 리스트를 같이 가져오기보단 관계 안묶인거 먼저 조회해놓고 지연 로딩으로 따로 가져와서 batch size 최적화 해보기
    @Override
    public GoalDetailResponseDto readGoalAndCheckListItem(Long studyId,Long weeklySprintId) {
        // TODO : 예외처리
        WeeklySprint weeklySprint = weeklySprintRepository.findById(weeklySprintId).orElseThrow();
        List<GoalResponseDto> goalResponseDtoList = goalRepository.findGoalAndWeeklySprintId(weeklySprintId);
        // TODO : 1번쨰 경우 -> studymember를 조회하고 dto로 묶어서 checklist 받아오기 -> MEMBER의 수만큼 쿼리 발생 ( 우선 이거 )
        // TODO : 2번째 경우 -> List<studymember>를 fetchjoin으로 한번에 다 가져온다 -> 목표까지 다 가지고 와야 함

        List<MemberCheckListResponseDto> memberCheckListResponseDtos = new ArrayList<>();

        // TODO : 나중에 memberCheckListResponse dto에 studyMember 이것만
        List<StudyMember> studyMemberEntityList = studyMemberRepository.findByStudyIdAndStatus(studyId,
            Status.ACTIVE);

        for(StudyMember studymemberEntity : studyMemberEntityList){
            List<CheckListItemDto> checkListItemDtoList = checkListItemRepository.findByWeeklySprintIdAndStudyId(weeklySprintId,studymemberEntity.getId());
              MemberCheckListResponseDto memberCheckListResponseDto = MemberCheckListResponseDto
                .builder()
                .studyMemberId(studymemberEntity.getId())
                .checkListItemDtoList(checkListItemDtoList)
                .build();
            memberCheckListResponseDtos.add(memberCheckListResponseDto);
        }


        return GoalDetailResponseDto.builder()
            .weeklySprintId(weeklySprintId)
            .targetDate(weeklySprint.getTargetDate())
            .goalDtoList(goalResponseDtoList)
            .memberCheckListResponseDtoList(memberCheckListResponseDtos)
            .build();
    }


}
