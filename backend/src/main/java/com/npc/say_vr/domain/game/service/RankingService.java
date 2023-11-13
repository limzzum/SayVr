package com.npc.say_vr.domain.game.service;

public interface RankingService {

    void updateRanking(Long userId, int point);
    Long readRank(Long userId);

}
