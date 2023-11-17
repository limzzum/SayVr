package com.npc.say_vr.domain.study.dto.requestDto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.lang.Nullable;

@Data
@NoArgsConstructor
@Builder
@AllArgsConstructor
public class StudySliceRequestDto {
    @Nullable
    Long lastId;
    String keyword;
    Integer size;
}
