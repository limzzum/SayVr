package com.npc.say_vr.domain.study.repository.studyRepository;

import static com.npc.say_vr.domain.study.domain.QStudy.study;
import static com.npc.say_vr.domain.study.domain.QStudyMember.studyMember;

import com.npc.say_vr.domain.study.constant.StudyStatus;
import com.npc.say_vr.domain.study.domain.Study;
import com.npc.say_vr.domain.study.dto.responseDto.QStudyInfoDto;
import com.npc.say_vr.domain.study.dto.responseDto.StudyInfoDto;
import com.npc.say_vr.global.constant.Status;
import com.querydsl.core.types.Projections;
import com.querydsl.jpa.impl.JPAQueryFactory;
import java.util.List;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Repository;

@RequiredArgsConstructor
@Repository
public class QueryDslStudyRepostiory {

    private final JPAQueryFactory queryFactory;

    public List<StudyInfoDto> findByUserId(Long userId) {
        return queryFactory
                .select(new QStudyInfoDto(
                        studyMember.study.id,
                        studyMember.study.name,
                        studyMember.study.maxPeople,
                        studyMember.study.currentPeople,
                        studyMember.study.description,
                        studyMember.study.rule,
                        studyMember.study.studyStatus))
                .from(studyMember)
                .where(studyMember.user.id.eq(userId),
                        study.studyStatus.ne(StudyStatus.DELETE),
                        studyMember.status.eq(Status.ACTIVE))
                .fetch();
    }

    public Study findById(Long studyId) {
        return queryFactory.selectFrom(study)
                .leftJoin(study.studyMembers, studyMember).fetchJoin()
                .where(study.id.eq(studyId), studyMember.status.eq(Status.ACTIVE))
                .fetchOne();
    }
}
