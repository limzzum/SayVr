package com.npc.say_vr.domain.study.repository.studyRepository;

import static com.npc.say_vr.domain.study.domain.QStudy.study;
import static com.npc.say_vr.domain.study.domain.QStudyMember.studyMember;
import static io.jsonwebtoken.lang.Strings.hasText;

import com.npc.say_vr.domain.study.constant.StudyStatus;
import com.npc.say_vr.domain.study.domain.Study;
import com.npc.say_vr.domain.study.dto.responseDto.QStudyInfoDto;
import com.npc.say_vr.domain.study.dto.responseDto.StudyInfoDto;
import com.npc.say_vr.global.constant.Status;
import com.querydsl.core.types.Projections;
import com.querydsl.core.types.dsl.BooleanExpression;
import com.querydsl.jpa.impl.JPAQueryFactory;
import java.util.List;
import lombok.RequiredArgsConstructor;
import org.springframework.lang.Nullable;
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

    public List<StudyInfoDto> findByKeyword(@Nullable Long studyId,Integer size,@Nullable String keyword) {
        return queryFactory
                .select(new QStudyInfoDto(
                        study.id,
                        study.name,
                        study.maxPeople,
                        study.currentPeople,
                        study.description,
                        study.rule,
                        study.studyStatus))
                .from(study)
                .where(ltStudyId(studyId),search(keyword),study.studyStatus.ne(StudyStatus.DELETE))
                .orderBy(study.id.desc())
                .limit(size)
                .fetch();
    }
    @SuppressWarnings("all")
    private BooleanExpression search(String keyword) {
        return hasText(keyword) ? containsTitle(keyword).or(containsDescription(keyword)) : null;
    }

    private BooleanExpression containsTitle(@Nullable String title) {
        return hasText(title) ? study.name.contains(title) : null;
    }

    private BooleanExpression containsDescription(@Nullable String description) {
        return hasText(description) ? study.description.contains(description) : null;
    }

    private BooleanExpression ltStudyId(@Nullable Long studyId) {
        return studyId == null ? null : study.id.lt(studyId);
    }

    public List<StudyInfoDto> findByList() {
        return queryFactory
                .select(new QStudyInfoDto(
                        study.id,
                        study.name,
                        study.maxPeople,
                        study.currentPeople,
                        study.description,
                        study.rule,
                        study.studyStatus))
                .from(study)
                .where(study.studyStatus.eq(StudyStatus.NOTFULL))
                .orderBy(study.id.desc())
                .limit(9)
                .fetch();
    }
}
