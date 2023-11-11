package com.npc.say_vr.domain.user.dto;

import com.querydsl.core.annotations.QueryProjection;
import java.time.LocalDate;
import java.time.format.DateTimeFormatter;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@AllArgsConstructor
@Data
@NoArgsConstructor
@Builder
public class ActivityDto {
  private LocalDate whenDate;
  private Long count;

  @QueryProjection
  public ActivityDto(String yyyymmdd, Long count) {
    this.whenDate =LocalDate.parse(yyyymmdd, DateTimeFormatter.ofPattern("yyyy-MM-dd"));
    this.count = count;
  }
}
