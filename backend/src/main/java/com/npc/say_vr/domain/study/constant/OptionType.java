package com.npc.say_vr.domain.study.constant;

import lombok.Getter;
import lombok.RequiredArgsConstructor;

@Getter
@RequiredArgsConstructor
public enum OptionType {
  VR("VR 대화"), GAME("매칭 게임"), QUIZ("퀴즈 게임"), ETC("기타"), DELETE("삭제");

  private final String message;

}
