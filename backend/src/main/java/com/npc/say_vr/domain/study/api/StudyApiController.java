package com.npc.say_vr.domain.study.api;

import static com.npc.say_vr.domain.study.constant.StudyResponseMessage.STUDY_CREATE_SUCCESS;
import static com.npc.say_vr.domain.study.constant.StudyResponseMessage.STUDY_READ_SUCCESS;
import static com.npc.say_vr.domain.study.constant.StudyResponseMessage.MINESTUDYS_READ_SUCCESS;
import static com.npc.say_vr.domain.study.constant.StudyResponseMessage.STUDY_JOIN_SUCCESS;
import static com.npc.say_vr.domain.study.constant.StudyResponseMessage.STUDYMEMBER_DELETE_SUCCESS;
import static com.npc.say_vr.domain.study.constant.StudyResponseMessage.STUDY_UPDATE_SUCCESS;
import com.npc.say_vr.domain.study.dto.requestDto.CreateStudyRequestDto;
import com.npc.say_vr.domain.study.dto.requestDto.JoinStudyRequestDto;
import com.npc.say_vr.domain.study.dto.requestDto.UpdateStudyRequestDto;
import com.npc.say_vr.domain.study.service.StudyService;
import com.npc.say_vr.global.dto.ResponseDto;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@CrossOrigin
@RestController
@RequiredArgsConstructor
@RequestMapping("/api/study")
public class StudyApiController {

  private final StudyService studyService;

  // TODO : user 가져오기, 예외 처리
  @PostMapping("")
  public ResponseEntity<?> createStudy(@RequestBody CreateStudyRequestDto createStudyRequestDto) {
    Long userId = 1L;
    ResponseDto responseDto = ResponseDto.builder()
            .message(STUDY_CREATE_SUCCESS.getMessage())
            .data(studyService.createStudy(userId,createStudyRequestDto))
            .httpStatus(STUDY_CREATE_SUCCESS.getHttpStatus())
            .build();

    return ResponseEntity.ok(responseDto);
  }

  // TODO : user 가져오기, 예외 처리
  @GetMapping("/{studyId}")
  public ResponseEntity<?> readStudyDetail(@PathVariable Long studyId) {
    Long userId = 2L;
    ResponseDto responseDto = ResponseDto.builder()
            .message(STUDY_READ_SUCCESS.getMessage())
            .data(studyService.readStudy(userId, studyId))
            .httpStatus(STUDY_READ_SUCCESS.getHttpStatus())
            .build();
    return ResponseEntity.ok(responseDto);
  }

  // TODO : 전체 스터디 리스트 조회 API ( 페이지네이션 사용할 것 )
//  @GetMapping("/list")
//  public ResponseEntity<?> readStudyList() {
//    ResponseDto responseDto = ResponseDto.builder()
//            .message("스터디 상세보기 완료")
//            .data(studyService.readStudy(userId, studyId))
//            .build();
//    return ResponseEntity.ok(responseDto);
//  }

  @GetMapping("/mine")
  public ResponseEntity<?> readStudyMineList() {
    Long userId = 2L;
    ResponseDto responseDto = ResponseDto.builder()
        .message(MINESTUDYS_READ_SUCCESS.getMessage())
        .data(studyService.readStudyMineList(userId))
        .httpStatus(MINESTUDYS_READ_SUCCESS.getHttpStatus())
        .build();
    return ResponseEntity.ok(responseDto);
  }

  @PostMapping("/join")
  public ResponseEntity<?> joinStudy(@RequestBody JoinStudyRequestDto joinStudyRequestDto) {
    Long userId = 2L;
    ResponseDto responseDto = ResponseDto.builder()
            .message(STUDY_JOIN_SUCCESS.getMessage())
            .data(studyService.joinStudy(userId, joinStudyRequestDto.getStudyId()))
            .httpStatus(STUDY_JOIN_SUCCESS.getHttpStatus())
            .build();

    return ResponseEntity.ok(responseDto);
  }

  @DeleteMapping("/quit/{studyId}")
  public ResponseEntity<?> deleteStudyMember(@PathVariable Long studyId) {
    Long userId = 2L;
    studyService.deleteStudyMember(userId,studyId);
    ResponseDto responseDto = ResponseDto.builder()
            .message(STUDYMEMBER_DELETE_SUCCESS.getMessage())
            .httpStatus(STUDYMEMBER_DELETE_SUCCESS.getHttpStatus())
            .build();

    return ResponseEntity.ok(responseDto);
  }

  @PutMapping("/{studyId}")
  public ResponseEntity<?> updateStudy(@PathVariable Long studyId, @RequestBody UpdateStudyRequestDto updateStudyRequestDto) {
    Long userId = 1L;
    ResponseDto responseDto = ResponseDto.builder()
            .message(STUDY_UPDATE_SUCCESS.getMessage())
            .data(studyService.updateStudy(userId, studyId,updateStudyRequestDto))
            .httpStatus(STUDY_UPDATE_SUCCESS.getHttpStatus())
            .build();

    return ResponseEntity.ok(responseDto);
  }

}
