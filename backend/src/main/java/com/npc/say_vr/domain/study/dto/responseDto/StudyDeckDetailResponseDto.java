package com.npc.say_vr.domain.study.dto.responseDto;

import java.util.List;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@Builder
@AllArgsConstructor
public class StudyDeckDetailResponseDto {
    List<StudyDeckInfo> studyDeckInfoList;
}
