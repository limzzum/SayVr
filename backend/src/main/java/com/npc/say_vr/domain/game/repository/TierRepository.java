package com.npc.say_vr.domain.game.repository;

import com.npc.say_vr.domain.game.domain.Tier;
import java.util.Optional;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

public interface TierRepository extends JpaRepository<Tier, Long> {

    @Query("SELECT t FROM Tier t WHERE t.minPoint <= :point AND t.maxPoint >= :point")
    Optional<Tier> findTierByMinPointIsLessThanEqualAndMaxPointGreaterThanEqual(Long point);

}
