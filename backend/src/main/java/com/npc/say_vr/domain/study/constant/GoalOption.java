package com.npc.say_vr.domain.study.constant;

import java.util.Arrays;
import java.util.Collections;
import java.util.List;

public enum GoalOption {
  OPTION("옵션", Arrays.asList(OptionType.VR,OptionType.GAME,OptionType.QUIZ)),
  ETC("기타", Collections.EMPTY_LIST);

  private String title;
  private List<OptionType> optionTypeList;

  GoalOption(String title, List<OptionType> optionTypeList) {
    this.title = title;
    this.optionTypeList = optionTypeList;
  }

//  public static GoalOption findByOptionType();
}
