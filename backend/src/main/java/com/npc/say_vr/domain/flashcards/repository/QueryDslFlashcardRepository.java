package com.npc.say_vr.domain.flashcards.repository;

import static com.npc.say_vr.domain.study.domain.QStudy.study;
import static io.jsonwebtoken.lang.Strings.hasText;

import com.npc.say_vr.domain.flashcards.dto.FlashcardsResponseDto.DeckTitleResponseDto;
import com.npc.say_vr.domain.study.constant.StudyStatus;
import com.npc.say_vr.domain.study.dto.responseDto.QStudyInfoDto;
import com.npc.say_vr.domain.study.dto.responseDto.StudyInfoDto;
import com.querydsl.core.types.dsl.BooleanExpression;
import com.querydsl.jpa.impl.JPAQueryFactory;
import java.util.List;
import lombok.RequiredArgsConstructor;
import org.springframework.lang.Nullable;
import org.springframework.stereotype.Repository;

@RequiredArgsConstructor
@Repository
public class QueryDslFlashcardRepository {

  private final JPAQueryFactory jpaQueryFactory;

//  public List<DeckTitleResponseDto> findByKeyword(@Nullable Long studyId,Integer size,@Nullable String keyword) {
//    return jpaQueryFactory
//        .select(new QStudyInfoDto(
//            study.id,
//            study.name,
//            study.maxPeople,
//            study.currentPeople,
//            study.description,
//            study.rule,
//            study.studyStatus))
//        .from(study)
//        .where(ltStudyId(studyId),search(keyword),study.studyStatus.ne(StudyStatus.DELETE))
//        .orderBy(study.id.desc())
//        .limit(size)
//        .fetch();
//  }
//  @SuppressWarnings("all")
//  private BooleanExpression search(String keyword) {
//    return hasText(keyword) ? containsTitle(keyword).or(containsDescription(keyword)) : null;
//  }
//
//  private BooleanExpression containsTitle(@Nullable String title) {
//    return hasText(title) ? study.name.contains(title) : null;
//  }
//
//  private BooleanExpression containsDescription(@Nullable String description) {
//    return hasText(description) ? study.description.contains(description) : null;
//  }
//
//  private BooleanExpression ltStudyId(@Nullable Long studyId) {
//    return studyId == null ? null : study.id.lt(studyId);
//  }

}
