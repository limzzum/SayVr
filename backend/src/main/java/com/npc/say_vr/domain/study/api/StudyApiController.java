package com.npc.say_vr.domain.study.api;

import com.npc.say_vr.domain.study.dto.requestDto.CreateStudyRequestDto;
import com.npc.say_vr.domain.study.service.StudyService;
import com.npc.say_vr.global.dto.ResponseDto;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
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
            .message("스터디 생성 완료")
            .data(studyService.createStudy(userId,createStudyRequestDto))
            .httpStatus(HttpStatus.CREATED)
            .build();

    return ResponseEntity.ok(responseDto);
  }

  // TODO : user 가져오기, 예외 처리
  @GetMapping("/{studyId}")
  public ResponseEntity<?> readStudyDetail(@PathVariable Long studyId) {
    Long userId = 1L;
    ResponseDto responseDto = ResponseDto.builder()
            .message("스터디 상세보기 완료")
            .data(studyService.readStudy(userId, studyId))
            .httpStatus(HttpStatus.OK)
            .build();
    return ResponseEntity.ok(responseDto);
  }

  // TODO : 내 스터디 리스트 가져오기
//  @GetMapping("/list/")
//  public ResponseEntity<?> readStudyDetail(@PathVariable Long studyId) {
//    Long userId = 1L;
//    ResponseDto responseDto = ResponseDto.builder()
//            .message("스터디 상세보기 완료")
//            .data(studyService.readStudy(userId, studyId))
//            .build();
//    return ResponseEntity.ok(responseDto);
//  }



}
