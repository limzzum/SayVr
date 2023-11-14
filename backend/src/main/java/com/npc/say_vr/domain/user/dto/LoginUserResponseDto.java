package com.npc.say_vr.domain.user.dto;

import com.npc.say_vr.domain.user.dto.UserResponseDto.TokenResponseDto;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@AllArgsConstructor
@Data
@NoArgsConstructor
@Builder
public class LoginUserResponseDto {

  private Long userId;
  private TokenResponseDto tokenResponseDto;

}
