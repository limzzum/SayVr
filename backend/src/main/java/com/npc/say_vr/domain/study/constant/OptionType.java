package com.npc.say_vr.domain.study.constant;

public enum OptionType {
  VR("VR게임"),
  GAME("매칭게임"),
  QUIZ("단어장퀴즈 100점");


  private String title;

  OptionType(String title) {this.title = title;}

  public String getTitle() {return title;}




}
