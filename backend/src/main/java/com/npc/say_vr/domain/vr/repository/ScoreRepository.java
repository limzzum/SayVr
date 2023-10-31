package com.npc.say_vr.domain.vr.repository;

import com.npc.say_vr.domain.vr.domain.Score;
import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ScoreRepository extends JpaRepository<Score, Long> {
    
    Score findFirstByUser_IdOrderByCreatedAtDesc(Long userId);

    List<Score> findByUser_Id(Long userId);


}
