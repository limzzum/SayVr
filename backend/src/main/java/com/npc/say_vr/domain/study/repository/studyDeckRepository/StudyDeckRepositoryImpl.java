package com.npc.say_vr.domain.study.repository.studyDeckRepository;

import com.npc.say_vr.domain.study.domain.StudyDeck;
import com.npc.say_vr.domain.study.dto.responseDto.StudyDeckInfo;
import com.npc.say_vr.domain.study.dto.responseDto.StudyDeckOneDetailResponseDto;
import com.npc.say_vr.domain.study.dto.responseDto.WordcardDto;
import java.util.List;
import java.util.Optional;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Repository;

@Repository
@RequiredArgsConstructor
public class StudyDeckRepositoryImpl implements StudyDeckRepository{
    private final JpaStudyDeckRepository jpaStudyDeckRepository;
    private final QueryDslStudyDeckRepository queryDslStudyDeckRepository;
    @Override
    public StudyDeck save(StudyDeck studyDeck) {
        return jpaStudyDeckRepository.save(studyDeck);
    }

    @Override
    public List<StudyDeckInfo> findByStudyId(Long studyId) {
        return queryDslStudyDeckRepository.findByStudyId(studyId);
    }

    @Override
    public Optional<StudyDeck> findById(Long studyDeckId) {
        return jpaStudyDeckRepository.findById(studyDeckId);
    }

    @Override
    public StudyDeckOneDetailResponseDto findByStudyDeckId(Long studyDeckId) {
        return queryDslStudyDeckRepository.findByStudyDeckId(studyDeckId);
    }

    @Override
    public List<WordcardDto> findWordcardsByFlashcardDeckId(Long flashcardDeckId) {
        return queryDslStudyDeckRepository.findWordcardsByFlashcardDeckId(flashcardDeckId);
    }
}
