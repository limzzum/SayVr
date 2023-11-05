package com.npc.say_vr.domain.game.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class PlayerDto {

    private Long userId;
    private Long ranking;
    private Long point;
    private int winCnt;
    private String profile;

    public void addWinCnt(){
        winCnt += 1;
    }

}
