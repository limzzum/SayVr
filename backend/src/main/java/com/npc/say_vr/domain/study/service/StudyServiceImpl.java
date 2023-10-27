package com.npc.say_vr.domain.study.service;

import com.npc.say_vr.domain.study.constant.StudyRole;
import com.npc.say_vr.domain.study.domain.Study;
import com.npc.say_vr.domain.study.domain.StudyMember;
import com.npc.say_vr.domain.study.dto.requestDto.CreateStudyRequestDto;
import com.npc.say_vr.domain.study.dto.responseDto.StudyDetailResponseDto;
import com.npc.say_vr.domain.study.dto.responseDto.StudyInfoDto;
import com.npc.say_vr.domain.study.repository.StudyMemberRepository;
import com.npc.say_vr.domain.study.repository.StudyRepository;
import com.npc.say_vr.domain.user.domain.User;
import com.npc.say_vr.domain.user.repository.UserRepository;
import com.npc.say_vr.global.constant.Status;
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
  public StudyDetailResponseDto createStudy(Long userId, CreateStudyRequestDto createStudyRequestDto) {
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
    StudyInfoDto studyInfoDto = createStudyInfoDto(study);

    return StudyDetailResponseDto.builder()
            .studyInfoDto(studyInfoDto)
            .memberId(studyMember.getId())
            .studyRole(studyMember.getStudyRole())
            .build();
  }

    @Override
    public StudyDetailResponseDto readStudy(Long userId, Long studyId) {

        //TODO : 예외처리
        StudyMember studyMember = studyMemberRepository.findByUserIdAndStudyId(userId, studyId).orElseThrow();
      log.info("studyMember에 조회 완료 : "+ studyMember.getId());
        StudyInfoDto studyInfoDto = createStudyInfoDto(studyMember.getStudy());

        return StudyDetailResponseDto.builder()
                .studyInfoDto(studyInfoDto)
                .memberId(studyMember.getId())
                .studyRole(studyMember.getStudyRole())
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
