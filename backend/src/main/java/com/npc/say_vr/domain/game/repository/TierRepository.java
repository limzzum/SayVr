package com.npc.say_vr.domain.game.repository;

import com.npc.say_vr.domain.game.domain.Tier;
import java.util.Optional;
import org.springframework.data.jpa.repository.JpaRepository;

public interface TierRepository extends JpaRepository<Tier, Long> {

    Optional<Tier> findTierByMinPointIsLessThanEqualAndMaxPointGreaterThanEqual(int point);

}
