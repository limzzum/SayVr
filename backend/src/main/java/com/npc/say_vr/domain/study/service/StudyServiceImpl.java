package com.npc.say_vr.domain.study.service;

import com.npc.say_vr.domain.study.constant.StudyRole;
import com.npc.say_vr.domain.study.constant.StudyStatus;
import com.npc.say_vr.domain.study.domain.Study;
import com.npc.say_vr.domain.study.domain.StudyMember;
import com.npc.say_vr.domain.study.dto.requestDto.CreateStudyRequestDto;
import com.npc.say_vr.domain.study.dto.requestDto.StudySliceRequestDto;
import com.npc.say_vr.domain.study.dto.requestDto.UpdateStudyRequestDto;
import com.npc.say_vr.domain.study.dto.responseDto.StudyDetailResponseDto;
import com.npc.say_vr.domain.study.dto.responseDto.StudyEnterResponseDto;
import com.npc.say_vr.domain.study.dto.responseDto.StudyInfoDto;
import com.npc.say_vr.domain.study.dto.responseDto.StudyListResponseDto;
import com.npc.say_vr.domain.study.dto.responseDto.StudyMineListResponseDto;
import com.npc.say_vr.domain.study.repository.studyMemberRepository.StudyMemberRepository;
import com.npc.say_vr.domain.study.repository.studyRepository.StudyRepository;
import com.npc.say_vr.domain.user.domain.User;
import com.npc.say_vr.domain.user.repository.UserRepository;
import com.npc.say_vr.global.constant.Status;
import java.util.List;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Slf4j
@Service
@RequiredArgsConstructor
@Transactional(readOnly = true)
public class StudyServiceImpl implements StudyService {

 private final StudyRepository studyRepository;
 private final StudyMemberRepository studyMemberRepository;
 private final UserRepository userRepository;
  @Transactional
  @Override
  public StudyEnterResponseDto createStudy(Long userId, CreateStudyRequestDto createStudyRequestDto) {
      // TODO : user 예외처리
    User leader = userRepository.findById(userId).orElseThrow();
    Study study = studyRepository.save(createStudyRequestDto.toEntity());
    log.info("study 생성 완료 : " + study.getId());
    StudyMember studyMember = StudyMember.builder()
        .status(Status.ACTIVE)
        .studyRole(StudyRole.LEADER)
        .user(leader)
        .study(study)
        .build();
    studyMemberRepository.save(studyMember);
    log.info("방장 studyMember에 추가 완료 : "+ studyMember.getId());

    return StudyEnterResponseDto.builder()
            .studyId(study.getId())
            .build();
  }

    @Override
    public StudyDetailResponseDto readStudy(Long userId, Long studyId) {
    StudyMember studyMember = studyMemberRepository.myfindAndNickNameByStudyId(userId, studyId);
      if (studyMember == null) {
//        Todo : 예외처리
          return null;
//        throw new StudyMemberNotFoundException("해당 스터디 멤버를 찾을 수 없습니다.");
      }
        log.info("studyMember에 조회 완료 : "+ studyMember.getId());
        StudyInfoDto studyInfoDto = createStudyInfoDto(studyMember.getStudy());

        return StudyDetailResponseDto.builder()
                .studyInfoDto(studyInfoDto)
                .memberId(studyMember.getId())
                .studyRole(studyMember.getStudyRole())
                .nickName(studyMember.getUser().getNickname())
                .build();
    }

  @Override
  public StudyMineListResponseDto readStudyMineList(Long userId) {
      List<StudyInfoDto> studyInfoDtoList = studyRepository.findByUserId(userId);

      if(studyInfoDtoList.isEmpty() || studyInfoDtoList == null) {
          // TODO : 예외처리
          log.info("내 스터디 리스트 없음");
      }
      log.info("내 스터디 조회 완료");
      StudyMineListResponseDto studyMineListResponseDto = StudyMineListResponseDto.builder()
              .studyInfoDtoList(studyInfoDtoList)
              .build();
    return studyMineListResponseDto;
  }

    @Transactional
    @Override
    public StudyEnterResponseDto joinStudy(Long userId, Long studyId) {
        // TODO : user,study 예외처리
        User user = userRepository.findById(userId).orElseThrow();
        Study study = studyRepository.findById(studyId).orElseThrow();

        StudyMember existingMember = studyMemberRepository.findByUserIdAndStudyId(userId, studyId);


        if(existingMember != null && existingMember.getStatus().equals(Status.ACTIVE)) {
            // TODO : 존재하는 멤버 예외처리
            return null;
        }

        if(study.getStudyStatus().equals(StudyStatus.FULL)) {
            // TDOO : 예외처리
            return null;
        }

        StudyMember studyMember;

        if(existingMember != null && existingMember.getStatus().equals(Status.DELETE)) {
            studyMember = existingMember;
            studyMember.updateStatus(Status.ACTIVE);
            log.info("사용자를 studyMember status 상태 active로 업뎃: "+ studyMember.getId());
        } else {
            studyMember = StudyMember.builder()
                    .status(Status.ACTIVE)
                    .studyRole(StudyRole.MEMBER)
                    .user(user)
                    .study(study)
                    .build();
            studyMemberRepository.save(studyMember);
            log.info("사용자를 studyMember에 추가 : "+ studyMember.getId());
        }
        study.updateCuurentPeople(study.getCurrentPeople()+1);
        if(study.getCurrentPeople() == study.getMaxPeople()) {
            study.updateStudyStatus(StudyStatus.FULL);
        }

        return StudyEnterResponseDto.builder()
                .studyId(studyId)
                .build();
  }

    @Transactional
    @Override
    public void deleteStudyMember(Long userId, Long studyId) {
        StudyMember studyMember = studyMemberRepository.findByUserIdAndStudyId(userId, studyId);
        log.info("studymember 조회 : "+ studyMember.getId());
        studyMember.updateStatus(Status.DELETE);
        if(studyMember.getStudyRole().equals(StudyRole.LEADER)) {
            if(studyMember.getStudy().getCurrentPeople() == 1) {
                studyMember.getStudy().updateStudyStatus(StudyStatus.DELETE);
                log.info("study 상태 delete 변경");
            }else {
                StudyMember nextLeaderMember = studyMemberRepository.findEarliestJoinedMember(studyId);
                nextLeaderMember.updateStudyRole(StudyRole.LEADER);
                log.info("study leader 변경");
            }
        }
        studyMember.getStudy().updateCuurentPeople(studyMember.getStudy().getCurrentPeople()-1);

        if(studyMember.getStudy().getStudyStatus().equals(StudyStatus.FULL)) {
            studyMember.getStudy().updateStudyStatus(StudyStatus.NOTFULL);
            log.info("study 상태 notfull 변경");
        }
    }

    @Transactional
    @Override
    public StudyDetailResponseDto updateStudy(Long userId, Long studyId, UpdateStudyRequestDto updateStudyRequestDto) {
      StudyMember studyMember = studyMemberRepository.myfindAndNickNameByStudyId(userId, studyId);
      if(studyMember.getStudyRole().equals(StudyRole.MEMBER)) {
          // TODO :예외 처리
          log.info("방장이 아니라 수정 불가");
          return null;
      }

      if(updateStudyRequestDto.getMaxPeople() < studyMember.getStudy().getCurrentPeople()) {
          // TODO : 예외처리
          log.info("현재 인원보다 설정한 인원이 작아서 수정 불가");
          return null;
      }

      studyMember.getStudy().updateStudy(updateStudyRequestDto.getName(), updateStudyRequestDto.getMaxPeople(),
              updateStudyRequestDto.getDescription(), updateStudyRequestDto.getRule());

      if(studyMember.getStudy().getMaxPeople() == studyMember.getStudy().getCurrentPeople()) {
          studyMember.getStudy().updateStudyStatus(StudyStatus.FULL);
      } else if(studyMember.getStudy().getMaxPeople() > studyMember.getStudy().getCurrentPeople()) {
          studyMember.getStudy().updateStudyStatus(StudyStatus.NOTFULL);
      }

      log.info("study 수정 완료");
      StudyInfoDto studyInfoDto = createStudyInfoDto(studyMember.getStudy());

      return StudyDetailResponseDto.builder()
                .studyInfoDto(studyInfoDto)
                .memberId(studyMember.getId())
                .studyRole(studyMember.getStudyRole())
                .nickName(studyMember.getUser().getNickname())
                .build();
    }

    @Override
    public StudyListResponseDto readStudyAllList(Long userId) {
        return StudyListResponseDto.builder()
                .studyInfoDtoList(studyRepository.findByList())
                .build();
    }

    @Override
    public StudyListResponseDto readStudyKeyWord(Long userId, StudySliceRequestDto studySliceRequestDto) {
        return StudyListResponseDto.builder()
                .studyInfoDtoList(studyRepository.findByKeyword(studySliceRequestDto.getStudyId(),studySliceRequestDto.getSize(),studySliceRequestDto.getKeyword()))
                .build();
    }


    public StudyInfoDto createStudyInfoDto(Study study) {
      return StudyInfoDto.builder()
              .studyId(study.getId())
              .name(study.getName())
              .maxPeople(study.getMaxPeople())
              .currentPeople(study.getCurrentPeople())
              .description(study.getDescription())
              .rule(study.getRule())
              .studyStatus(study.getStudyStatus())
              .build();
  }
}
