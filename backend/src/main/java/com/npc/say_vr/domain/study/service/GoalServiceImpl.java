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
import com.npc.say_vr.domain.study.dto.requestDto.CreateGoalRequestDto;
import com.npc.say_vr.domain.study.dto.requestDto.GoalRequestDto;
import com.npc.say_vr.domain.study.dto.responseDto.GoalDetailResponseDto;
import com.npc.say_vr.domain.study.dto.responseDto.GoalResponseDto;
import com.npc.say_vr.domain.study.dto.responseDto.MemberCheckListResponseDto;
import com.npc.say_vr.domain.study.repository.CheckListItemRepository.CheckListItemRepository;
import com.npc.say_vr.domain.study.repository.GoalRepository.GoalRepository;
import com.npc.say_vr.domain.study.repository.WeeklySprintRepository.WeeklySprintRepository;
import com.npc.say_vr.domain.study.repository.studyMemberRepository.StudyMemberRepository;
import com.npc.say_vr.domain.study.repository.studyRepository.StudyRepository;
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
    @Transactional
    @Override
    public GoalDetailResponseDto createGoal(Long studyId, CreateGoalRequestDto createGoalRequestDto) {
        // TODO : 성능개선하기 => 시퀀스 전략 : BATCH INSERT OR JDBCTEMPLATE 전략 => 시간 측정!
        // TODO : checklist 저장하고 가져올 때 성능개선..????
        LocalDate startDate = createGoalRequestDto.getStartDate();
        List<GoalRequestDto> goalDtoList = createGoalRequestDto.getGoalDtoList();

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
        for(GoalRequestDto goalRequestDto : goalDtoList) {
            Goal goal;
            if(goalRequestDto.getOptionType().equals(OptionType.ETC)){
                goal = Goal.builder()
                        .count(goalRequestDto.getCount())
                        .optionType(goalRequestDto.getOptionType())
                        .weeklySprint(weeklySprint)
                        .description(goalRequestDto.getDescription())
                        .build();
                goalRepository.save(goal);
            }else {
                goal = Goal.builder()
                        .count(goalRequestDto.getCount())
                        .optionType(goalRequestDto.getOptionType())
                        .weeklySprint(weeklySprint)
                        .description(goalRequestDto.getOptionType().getMessage())
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
}
