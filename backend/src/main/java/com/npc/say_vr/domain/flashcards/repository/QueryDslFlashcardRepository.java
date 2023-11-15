package com.npc.say_vr.domain.flashcards.repository;

import static com.npc.say_vr.domain.flashcards.domain.QPersonalDeck.personalDeck;
import com.npc.say_vr.domain.flashcards.constant.FlashcardStatus;
import com.npc.say_vr.domain.flashcards.domain.PersonalDeck;
import com.npc.say_vr.domain.flashcards.domain.QPersonalDeck;
import com.npc.say_vr.domain.flashcards.dto.FlashcardsRequestDto.ReadDeckSearchRequestDto;
import com.querydsl.core.BooleanBuilder;
import com.querydsl.core.types.OrderSpecifier;
import com.querydsl.core.types.dsl.BooleanExpression;
import com.querydsl.jpa.impl.JPAQueryFactory;
import java.util.List;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Repository;

@RequiredArgsConstructor
@Repository
public class QueryDslFlashcardRepository {

  private final JPAQueryFactory jpaQueryFactory;


     // TODO : 코드 다듬기 GROUPBY => 동적 쿼리
     public List<PersonalDeck> searchAndSortPersonalDecks(ReadDeckSearchRequestDto readDeckSearchRequestDto) {
         BooleanBuilder predicate = new BooleanBuilder();

         String keyword = readDeckSearchRequestDto.getKeyword();
         String sortBy = readDeckSearchRequestDto.getSortBy();
         Long lastId = readDeckSearchRequestDto.getLastId();
         int pageSize = readDeckSearchRequestDto.getPageSize();

//         if (keyword != null && !keyword.isEmpty()) {
//             predicate.and(personalDeck.name.containsIgnoreCase(keyword));
//         }
//
//         if (lastId != null) {
//             predicate.and(personalDeck.id.lt(lastId));
//         }

         return jpaQueryFactory.selectFrom(personalDeck)
                 .where(getWhereExpression(sortBy, lastId,keyword),personalDeck.status.eq(FlashcardStatus.PUBLIC))
                 .orderBy(getOrderSpecifier(sortBy))
                 .limit(pageSize)
                 .fetch();
         // TODO : 1개 더가져와서 hasNext여부 구하기
     }
    private BooleanExpression getWhereExpression(String sortBy, Long lastId, String keyword) {
        BooleanExpression expression = null;
        PersonalDeck lastDeck = null;

        if (lastId != null && ( "forkCount".equalsIgnoreCase(sortBy) || "wordCount".equalsIgnoreCase(sortBy)) ) {
            lastDeck = jpaQueryFactory.selectFrom(personalDeck)
                    .where(personalDeck.id.eq(lastId))
                    .fetchOne();
        }

        if (lastDeck != null) {
            if ("forkCount".equalsIgnoreCase(sortBy)) {
                expression = personalDeck.forkCount.lt(lastDeck.getForkCount());
            } else if ("wordCount".equalsIgnoreCase(sortBy)) {
                expression = personalDeck.wordCount.lt(lastDeck.getWordCount());
            } else if ("createdAt".equalsIgnoreCase(sortBy)) {
                expression = personalDeck.id.lt(lastDeck.getId());
            }
        } else {
            if ("forkCount".equalsIgnoreCase(sortBy)) {
                expression = personalDeck.forkCount.lt(Integer.MAX_VALUE);
            } else if ("wordCount".equalsIgnoreCase(sortBy)) {
                expression = personalDeck.wordCount.lt(Integer.MAX_VALUE);
            } else if ("createdAt".equalsIgnoreCase(sortBy)) {
                expression = personalDeck.id.lt(Long.MAX_VALUE);
            }
        }

        if (keyword != null && !keyword.isEmpty()) {
            BooleanExpression keywordExpression = personalDeck.name.containsIgnoreCase(keyword);
            expression = expression != null ? expression.and(keywordExpression) : keywordExpression;
        }

        return expression;
    }

    private OrderSpecifier<?> getOrderSpecifier(String sortBy) {
        if ("forkCount".equalsIgnoreCase(sortBy)) {
            return personalDeck.forkCount.desc();
        } else if ("wordCount".equalsIgnoreCase(sortBy)){
            return personalDeck.wordCount.desc();
        } else if ("createdAt".equalsIgnoreCase(sortBy)) {
            return personalDeck.flashcardDeck.createdAt.desc();
        }

        return personalDeck.id.desc();
    }

     // TODO : forkCount, wordCount 변경
//    private com.querydsl.core.types.OrderSpecifier<?>[] getOrderByClause(String sortBy, QPersonalDeck personalDeck) {
//        if(sortBy == null) sortBy=""; // TODO : 다르게 바꾸기;;;;
//         switch (sortBy) {
//            case "forkCount":
//                return new com.querydsl.core.types.OrderSpecifier[]{personalDeck.forkCount.desc(), personalDeck.id.asc()};
//            case "wordCount":
//                return new com.querydsl.core.types.OrderSpecifier[]{personalDeck.wordCount.desc(), personalDeck.id.asc()};
//            case "createdAt":
//                return new com.querydsl.core.types.OrderSpecifier[]{personalDeck.flashcardDeck.createdAt.desc(), personalDeck.id.asc()};
//            default:
//                return new com.querydsl.core.types.OrderSpecifier[]{personalDeck.id.desc()};
//        }
//    }
}
