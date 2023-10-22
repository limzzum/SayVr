package com.npc.say_vr.domain.game.repository;

import com.npc.say_vr.domain.game.domain.Game;
import org.springframework.data.jpa.repository.JpaRepository;

public interface GameRepository extends JpaRepository<Game, Long> {

}
