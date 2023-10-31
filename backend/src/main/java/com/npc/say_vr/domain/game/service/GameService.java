package com.npc.say_vr.domain.game.service;

import com.npc.say_vr.domain.game.dto.GameRequestDto.PlayerOutRequestDto;
import com.npc.say_vr.domain.game.dto.GameRequestDto.SubmitAnswerRequestDto;
import com.npc.say_vr.domain.game.dto.GameResponseDto.GameResultDto;

public interface GameService {
    Long create();
    Long registWaitingQueue(Long userId);
    boolean checkQuizAnswer(SubmitAnswerRequestDto gameSubmitQuizAnswerRequestDto);
    String getQuizQuestion(String answer);
    String createQuizAnswer();
    String updateQuiz(Long gameId);
    boolean isTimeLimitExceeded(Long gameId);
    boolean isEndGame(Long gameId);
    GameResultDto getGameResult(Long gameId);
    GameResultDto playerOutGame(PlayerOutRequestDto playerOutRequestDto);


}
