package com.npc.say_vr.domain.study.repository.studyRepository;

import com.npc.say_vr.domain.study.domain.Study;
import com.npc.say_vr.domain.study.dto.responseDto.StudyInfoDto;
import java.util.List;
import java.util.Optional;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Repository;

@Repository
@RequiredArgsConstructor
public class StudyRepositoryImpl implements StudyRepository{

    private final QueryDslStudyRepostiory queryDslStudyRepostiory;
    private final JpaStudyRepository jpaStudyRepository;

    @Override
    public Study save(Study study) {
        return jpaStudyRepository.save(study);
    }

    @Override
    public List<StudyInfoDto> findByUserId(Long userId) {
        return queryDslStudyRepostiory.findByUserId(userId);
    }

    @Override
    public Optional<Study> findById(Long studyId) {
        return jpaStudyRepository.findById(studyId);
    }

    @Override
    public List<StudyInfoDto> findByKeyword(Long studyId, Integer size, String keyword) {
        return queryDslStudyRepostiory.findByKeyword(studyId,size,keyword);
    }

    @Override
    public List<StudyInfoDto> findByList() {
        return queryDslStudyRepostiory.findByList();
    }

}
