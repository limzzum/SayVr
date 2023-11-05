package com.npc.say_vr.domain.game.repository;

import com.npc.say_vr.domain.game.domain.Ranking;
import java.util.Optional;
import org.springframework.data.jpa.repository.JpaRepository;

public interface RankingRepository extends JpaRepository<Ranking, Long> {

    Optional<Ranking> findByUserId(Long userId);

}
