package com.npc.say_vr.domain.game.service;

import com.npc.say_vr.domain.game.domain.Ranking;
import com.npc.say_vr.domain.game.domain.Tier;
import com.npc.say_vr.domain.game.repository.RankingRepository;
import com.npc.say_vr.domain.game.repository.TierRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Slf4j
@Service
@RequiredArgsConstructor
@Transactional
public class RankingServiceImpl implements RankingService{

    private final RankingRepository rankingRepository;
    private final TierRepository tierRepository;

    @Override
    public void updateRanking(Long userId, int point) {
        Ranking ranking = rankingRepository.findByUserId(userId).orElseThrow();
        ranking.updatePoint(point);
        Tier tier = tierRepository.findTierByMinPointIsLessThanEqualAndMaxPointGreaterThanEqual(
            ranking.getPoint()).orElseThrow();
        ranking.updateTier(tier);
    }

    @Override
    public Long readRank(Long userId) {
        Ranking ranking = rankingRepository.findByUserId(userId).orElseThrow();
        Long rank = rankingRepository.countByPointGreaterThan(ranking.getPoint()) + 1;
        return rank;
    }
}
