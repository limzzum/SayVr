package com.npc.say_vr.domain.study.api;

import com.npc.say_vr.domain.study.dto.StudyRequestDto.CreateStudyRequestDto;
import com.npc.say_vr.domain.study.service.StudyService;
import com.npc.say_vr.global.dto.ResponseDto;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/study")
public class StudyApiController {

  private final StudyService studyService;

  // TODO
  @PostMapping("")
  public ResponseEntity<?> createStudy(@RequestBody CreateStudyRequestDto createStudyRequestDto) {
    Long userId = 1L;
//    return ResponseEntity.ok(studyService.createStudy(userId,createStudyRequestDto), HttpStatus.)
    return null;
  }
}
