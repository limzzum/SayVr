package com.npc.say_vr.domain.flashcards.repository;

import static com.npc.say_vr.domain.flashcards.domain.QPersonalDeck.personalDeck;
import com.npc.say_vr.domain.flashcards.constant.FlashcardStatus;
import com.npc.say_vr.domain.flashcards.domain.PersonalDeck;
import com.npc.say_vr.domain.flashcards.domain.QPersonalDeck;
import com.npc.say_vr.domain.flashcards.dto.FlashcardsRequestDto.ReadDeckSearchRequestDto;
import com.querydsl.core.BooleanBuilder;
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

         if (keyword != null && !keyword.isEmpty()) {
             predicate.and(personalDeck.name.containsIgnoreCase(keyword));
         }

         if (lastId != null) {
             predicate.and(personalDeck.id.lt(lastId));
         }

         return jpaQueryFactory.selectFrom(personalDeck)
                 .where(predicate,personalDeck.status.eq(FlashcardStatus.PUBLIC))
                 .orderBy(getOrderByClause(sortBy, personalDeck))
                 .limit(pageSize)
                 .fetch();
     }
     // TODO : forkCount, wordCount 변경
    private com.querydsl.core.types.OrderSpecifier<?>[] getOrderByClause(String sortBy, QPersonalDeck personalDeck) {
        if(sortBy == null) sortBy=""; // TODO : 다르게 바꾸기;;;;
         switch (sortBy) {
            case "forkCount":
                return new com.querydsl.core.types.OrderSpecifier[]{personalDeck.forkCount.desc(), personalDeck.id.asc()};
            case "wordCount":
                return new com.querydsl.core.types.OrderSpecifier[]{personalDeck.wordCount.desc(), personalDeck.id.asc()};
            case "createdAt":
                return new com.querydsl.core.types.OrderSpecifier[]{personalDeck.flashcardDeck.createdAt.desc(), personalDeck.id.asc()};
            default:
                return new com.querydsl.core.types.OrderSpecifier[]{personalDeck.id.desc()};
        }
    }
}
