package com.npc.say_vr.domain.game.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class GameStatusDto {
    private Long gameId;
    private int curRound;
    private PlayerDto playerA;
    private PlayerDto playerB;

}
