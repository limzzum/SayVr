package com.npc.say_vr.domain.study.repository.studyRepository;

import com.npc.say_vr.domain.study.domain.Study;
import com.npc.say_vr.domain.study.dto.responseDto.StudyInfoDto;
import java.util.List;
import java.util.Optional;

public interface StudyRepository {
    Study save(Study study);

    List<StudyInfoDto> findByUserId(Long userId);

    Optional<Study> findById(Long studyId);
}
