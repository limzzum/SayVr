package com.npc.say_vr.domain.study.repository.studyDeckRepository;

import com.npc.say_vr.domain.study.domain.StudyDeck;
import com.npc.say_vr.domain.study.dto.responseDto.StudyDeckInfo;
import com.npc.say_vr.domain.study.dto.responseDto.StudyDeckOneDetailResponseDto;
import com.npc.say_vr.domain.study.dto.responseDto.WordcardDto;
import java.util.List;
import java.util.Optional;

public interface StudyDeckRepository {

    StudyDeck save(StudyDeck studyDeck);

    List<StudyDeckInfo> findByStudyId(Long studyId);

    Optional<StudyDeck> findById(Long studyDeckId);

    StudyDeckOneDetailResponseDto findByStudyDeckId(Long studyDeckId);

    List<WordcardDto> findWordcardsByFlashcardDeckId(Long flashcardDeckId);
}
