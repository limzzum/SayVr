package com.npc.say_vr.domain.study.repository.studyDeckRepository;

import static com.npc.say_vr.domain.flashcards.domain.QWordcard.wordcard;
import static com.npc.say_vr.domain.study.domain.QStudyDeck.studyDeck;

import com.npc.say_vr.domain.flashcards.constant.WordcardStatus;
import com.npc.say_vr.domain.flashcards.domain.Wordcard;
import com.npc.say_vr.domain.study.dto.responseDto.QStudyDeckInfo;
import com.npc.say_vr.domain.study.dto.responseDto.QStudyDeckOneDetailResponseDto;
import com.npc.say_vr.domain.study.dto.responseDto.QWordcardDto;
import com.npc.say_vr.domain.study.dto.responseDto.StudyDeckInfo;
import com.npc.say_vr.domain.study.dto.responseDto.StudyDeckOneDetailResponseDto;
import com.npc.say_vr.domain.study.dto.responseDto.WordcardDto;
import com.npc.say_vr.global.constant.Status;
import com.querydsl.jpa.impl.JPAQueryFactory;
import java.util.List;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Repository;

@RequiredArgsConstructor
@Repository
public class QueryDslStudyDeckRepository  {

    private final JPAQueryFactory queryFactory;

    public List<StudyDeckInfo> findByStudyId(Long studyId) {
        return queryFactory
                .select(new QStudyDeckInfo(
                        studyDeck.id,
                        studyDeck.name,
                        studyDeck.flashcardDeck.id,
                        studyDeck.wordCount))
                .from(studyDeck)
                .where(studyDeck.study.id.eq(studyId),
                        studyDeck.status.eq(Status.ACTIVE))
                .fetch();
    }

    public StudyDeckOneDetailResponseDto findByStudyDeckId(Long studyDeckId) {
        return queryFactory
                .select(new QStudyDeckOneDetailResponseDto(
                        studyDeck.id,
                        studyDeck.name,
                        studyDeck.flashcardDeck.id,
                        studyDeck.wordCount))
                .from(studyDeck)
                .where(studyDeck.id.eq(studyDeckId),
                        studyDeck.status.eq(Status.ACTIVE))
                .fetchOne();
    }

    // null 값 잘 나오는지 체크할 것
    public List<WordcardDto> findWordcardsByFlashcardDeckId(Long flashcardDeckId) {
        return queryFactory
                .select(new QWordcardDto(
                        wordcard.id,
                        wordcard.word.korean,
                        wordcard.word.english,
                        wordcard.status))
                .from(wordcard)
                .where(wordcard.flashcardDeck.id.eq(flashcardDeckId),
                        wordcard.status.ne(WordcardStatus.DELETED))
                .fetch();
    }
}
