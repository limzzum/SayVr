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
import com.npc.say_vr.domain.study.dto.requestDto.CreateWeeklySprintRequestDto;
import com.npc.say_vr.domain.study.dto.requestDto.UpdateGoalRequestDto;
import com.npc.say_vr.domain.study.dto.responseDto.GoalDetailResponseDto;
import com.npc.say_vr.domain.study.dto.responseDto.GoalResponseDto;
import com.npc.say_vr.domain.study.dto.responseDto.MemberCheckListResponseDto;
import com.npc.say_vr.domain.study.dto.responseDto.WeeklySprintDetailResponse;
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
    public WeeklySprintDetailResponse createWeeklySprint(Long userId,Long studyId, CreateWeeklySprintRequestDto createWeeklySprintRequestDto) {
        // TODO : 성능개선하기 => 시퀀스 전략 : BATCH INSERT OR JDBCTEMPLATE 전략 => 시간 측정!
        // TODO : checklist 저장하고 가져올 때 성능개선..????
        LocalDate startDate = createWeeklySprintRequestDto.getStartDate();
        List<CreateGoalRequestDto> goalDtoList = createWeeklySprintRequestDto.getGoalDtoList();

        // TODO : 예외처리
        // TODO : QUERYDSL로 STUDY에서 한번에 가져오기 ( + studymember active만 가져오기도 처리 )
        // TODO : QUERYDSL로 STUDY + STUDYMEMBER + USER의 닉네임한번에 가져오기
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
                    .nickName(studyMember.getUser().getNickname())
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

        GoalDetailResponseDto goalDetailResponseDto = GoalDetailResponseDto.builder()
            .weeklySprintId(weeklySprint.getId())
            .targetDate(weeklySprint.getTargetDate())
            .goalDtoList(goalResponseDtoList)
            .memberCheckListResponseDtoList(memberCheckListResponseDtoList)
            .build();

        Long preWeeklySprintId = findPreviousSprintId(studyId, weeklySprint.getId());
        Long nextWeeklySprintId = findNextSprintId(studyId, weeklySprint.getId());


        return WeeklySprintDetailResponse.builder()
            .preWeeklySprintId(preWeeklySprintId)
            .nextWeeklySprintId(nextWeeklySprintId)
            .goalDetailResponseDto(goalDetailResponseDto)
            .build();

    }

    @Transactional
    @Override
    public WeeklySprintDetailResponse createGoal(Long userId,Long studyId, Long weeklySprintId,CreateGoalRequestDto createGoalRequestDto) {

        if(goalRepository.existGoal(weeklySprintId,createGoalRequestDto.getOptionType())) {
            // TODO : 만약 이미 있는 옵션 타입이라면 예외 처리
            log.info("이미 있는 옵션 타입입니다.");
            return null;
        }
        createGoalAndSave(studyId,weeklySprintId,createGoalRequestDto);
        return readGoalAndCheckListItem(userId,studyId,weeklySprintId);
    }

    // TODO : 위에 스프린트만들면서 GOAL만드는 부분이랑 중복된 코드 => 리팩토링
    @Transactional
    @Override
    public void createGoalAndSave(Long studyId, Long weeklySprintId,
        CreateGoalRequestDto createGoalRequestDto){
        // TODO : 예외처리
        WeeklySprint weeklySprint = weeklySprintRepository.findById(weeklySprintId).orElseThrow();
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

        List<StudyMember> studyMemberEntityList = studyMemberRepository.findByStudyIdAndStatus(studyId,Status.ACTIVE);

        for(StudyMember studyMember : studyMemberEntityList){
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
        }
    }

    @Transactional
    @Override
    public WeeklySprintDetailResponse updateGoal(Long userId,Long studyId,Long weeklySprintId, Long goalId, UpdateGoalRequestDto updateGoalRequestDto) {
        updateGoalAndCheckList(goalId, updateGoalRequestDto);
        return readGoalAndCheckListItem(userId,studyId,weeklySprintId);
    }
    @Transactional
    @Override
    public void updateGoalAndCheckList(Long goalId, UpdateGoalRequestDto updateGoalRequestDto) {
        // TODO 예외처리
        Goal goal = goalRepository.findGoalAndCheckListItem(goalId);
        // TODO : 코드 리팩토링
        if(goal.getOptionType().equals(OptionType.ETC)) {
            goal.updateETCGoal(updateGoalRequestDto.getCount(), updateGoalRequestDto.getDescription());
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

    // TODO : 1:n 관계로는 리스트를 같이 가져오기보단 관계 안묶인거 먼저 조회해놓고 지연 로딩으로 따로 가져와서 batch size 최적화 해보기
    // TODO : nickname, studymemberid
    @Override
    public WeeklySprintDetailResponse readGoalAndCheckListItem(Long userId,Long studyId,Long weeklySprintId) {
        // TODO : 예외처리
        WeeklySprint weeklySprint = weeklySprintRepository.findById(weeklySprintId).orElseThrow();
        List<GoalResponseDto> goalResponseDtoList = goalRepository.findGoalAndWeeklySprintId(weeklySprintId);
        // TODO : 1번쨰 경우 -> studymember를 조회하고 dto로 묶어서 checklist 받아오기 -> MEMBER의 수만큼 쿼리 발생 ( 우선 이거 )
        // TODO : 2번째 경우 -> List<studymember>를 fetchjoin으로 한번에 다 가져온다 -> 목표까지 다 가지고 와야 함

        List<MemberCheckListResponseDto> memberCheckListResponseDtos = new ArrayList<>();

        List<StudyMember> studyMemberEntityList = new ArrayList<>();

        StudyMember myStudyMember = studyMemberRepository.myfindAndNickNameByStudyId(userId, studyId);

        studyMemberEntityList.add(myStudyMember);

        // TODO : 나중에 memberCheckListResponse dto에 studyMember 이것만 + nickname만 가져오기
        List<StudyMember> studyMemberListNeMy = studyMemberRepository.findAndNickNameByStudyId(userId, studyId);

        studyMemberEntityList.addAll(studyMemberListNeMy);

        for(StudyMember studymemberEntity : studyMemberEntityList){
            List<CheckListItemDto> checkListItemDtoList = checkListItemRepository.findByWeeklySprintIdAndStudyId(weeklySprintId,studymemberEntity.getId());
              MemberCheckListResponseDto memberCheckListResponseDto = MemberCheckListResponseDto
                .builder()
                .studyMemberId(studymemberEntity.getId())
                .nickName(studymemberEntity.getUser().getNickname())
                .checkListItemDtoList(checkListItemDtoList)
                .build();
            memberCheckListResponseDtos.add(memberCheckListResponseDto);
        }

        GoalDetailResponseDto goalDetailResponseDto = GoalDetailResponseDto.builder()
            .weeklySprintId(weeklySprintId)
            .targetDate(weeklySprint.getTargetDate())
            .goalDtoList(goalResponseDtoList)
            .memberCheckListResponseDtoList(memberCheckListResponseDtos)
            .build();

        Long preWeeklySprintId = findPreviousSprintId(studyId, weeklySprint.getId());
        log.info("preWeeklySprintId 조회 : " );
        Long nextWeeklySprintId = findNextSprintId(studyId, weeklySprint.getId());
        log.info("nextWeeklySprintId 조회 : " );


        return WeeklySprintDetailResponse.builder()
            .preWeeklySprintId(preWeeklySprintId)
            .nextWeeklySprintId(nextWeeklySprintId)
            .goalDetailResponseDto(goalDetailResponseDto)
            .build();
    }

    @Override
    public Long findPreviousSprintId(Long studyId, Long weeklySprintId) {
        return weeklySprintRepository.findPreviousSprintId(studyId, weeklySprintId);
    }

    @Override
    public Long findNextSprintId(Long studyId, Long weeklySprintId) {
        return weeklySprintRepository.findNextSprintId(studyId, weeklySprintId);
    }

    @Transactional
    @Override
    public WeeklySprintDetailResponse deleteGoal(Long userId,Long studyId, Long weeklySprintId, Long goalId) {
        deleteGoalAndSave(goalId);
        return readGoalAndCheckListItem(userId,studyId,weeklySprintId);
    }

    @Transactional
    @Override
    public void deleteGoalAndSave(Long goalId) {
        // TODO 예외처리
        Goal goal = goalRepository.findGoalAndCheckListItem(goalId);
        goal.updateStatus(OptionType.DELETE);

        List<ChecklistItem> checklistItemList = goal.getChecklistItemList();

        for(ChecklistItem checklistItem : checklistItemList) {
            checklistItem.updateChecklistItemAndOptional(CheckListStatus.DELETE);
        }
    }


}
