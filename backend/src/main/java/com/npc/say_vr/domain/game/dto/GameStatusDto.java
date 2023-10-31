package com.npc.say_vr.domain.game.dto;

import java.time.LocalDateTime;
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
    private String question;
    private String answer;
    private LocalDateTime quizEndTime;

}
