package com.npc.say_vr.domain.vr.repository;

import com.npc.say_vr.domain.vr.domain.Conversation;
import io.lettuce.core.dynamic.annotation.Param;
import java.time.Month;
import java.time.Year;
import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

@Repository
public interface ConversationRepository extends JpaRepository<Conversation, Long> {

    @Query("SELECT c FROM Conversation c WHERE c.user.id = :userId AND YEAR(c.createdAt) = :year AND MONTH(c.createdAt) = :month")
    List<Conversation> findByUserIdAndYearAndMonth(@Param("userId") Long userId, @Param("year") int year, @Param("month") int month);

    List<Conversation> findByUser_Id(Long userId);

}
