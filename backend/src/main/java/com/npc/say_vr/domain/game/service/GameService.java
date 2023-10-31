package com.npc.say_vr.domain.game.service;

public interface GameService {
    Long create();
    Long registWaitingQueue(Long userId);
    boolean checkQuizAnswer(Long gameId, String answer);
    String getQuizQuestion(String answer);
    String createQuizAnswer();
    void updateQuiz(Long gameId);

}
