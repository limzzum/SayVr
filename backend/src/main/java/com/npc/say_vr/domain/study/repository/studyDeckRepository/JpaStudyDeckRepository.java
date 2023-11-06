package com.npc.say_vr.domain.study.repository.studyDeckRepository;

import com.npc.say_vr.domain.study.domain.StudyDeck;
import org.springframework.data.jpa.repository.JpaRepository;

public interface JpaStudyDeckRepository extends JpaRepository<StudyDeck, Long> {
}
