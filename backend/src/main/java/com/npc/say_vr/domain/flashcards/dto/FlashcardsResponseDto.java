package com.npc.say_vr.domain.flashcards.dto;

import com.npc.say_vr.domain.flashcards.constant.FlashcardStatus;
import com.npc.say_vr.domain.flashcards.constant.SavingProgressStatus;
import com.npc.say_vr.domain.flashcards.constant.WordcardStatus;
import com.npc.say_vr.domain.flashcards.domain.FlashcardDeck;
import com.npc.say_vr.domain.flashcards.domain.PersonalDeck;
import com.npc.say_vr.domain.flashcards.domain.Wordcard;
import com.querydsl.core.annotations.QueryProjection;
import java.util.List;
import java.util.stream.Collectors;
import lombok.Builder;
import lombok.Getter;

public class FlashcardsResponseDto {

    @Getter
    public static class WordcardDto {

        private Long id;
        private String kor;
        private String eng;
        private WordcardStatus wordcardStatus;


        public WordcardDto(Wordcard wordcard) {
            this.id = wordcard.getId();
            this.eng = wordcard.getWord().getEnglish();
            this.kor = wordcard.getWord().getKorean();
            this.wordcardStatus = wordcard.getStatus();
        }
    }

    @Getter
    public static class FlashcardDto {

        private List<WordcardDto> wordcardList;

        //TODO: filter로 백에서 프론트가 할 로직을,, 대신해 줄 수 있나? 복습 모드 unchecked만 보내주기
        public FlashcardDto(FlashcardDeck flashcardDeck) {
            this.wordcardList = flashcardDeck.getWordcards().stream()
                .filter(wordcard -> !wordcard.getStatus().equals(WordcardStatus.DELETED))
                .map(WordcardDto::new)
                .collect(Collectors.toList());
        }

    }

    @Getter
    public static class DeckTitleResponseDto {

        private String nickname;
        private String name;
        private Long id;
        //TODO forked 표시 내려면 별도 테이블 필요. fork 수 보여주는 것으로 대체하기
        private int forkCount;
        private int wordCount;

        public DeckTitleResponseDto(PersonalDeck personalDeck) {
            this.nickname = personalDeck.getUser().getNickname();
            this.name = personalDeck.getName();
            this.id = personalDeck.getId();
            this.forkCount = personalDeck.getForkCount();
            this.wordCount = personalDeck.getWordCount();
        }

        @QueryProjection
        public DeckTitleResponseDto(String nickname, String name, Long id, int forkCount,
            int wordCount) {
            this.nickname = nickname;
            this.name = name;
            this.id = id;
            this.forkCount = forkCount;
            this.wordCount = wordCount;
        }
    }

    @Getter
    public static class DeckCreateResponseDto {

        private Long id;
        private Long userId;
        private String name;
        private String nickname;
        private Long flashcardDeckId;
        private FlashcardStatus status;
        private SavingProgressStatus savingProgressStatus;

        public DeckCreateResponseDto(PersonalDeck personalDeck) {
            this.id = personalDeck.getId();
            this.userId = personalDeck.getUser().getId();
            this.name = personalDeck.getName();
            this.nickname = personalDeck.getUser().getNickname();
            this.flashcardDeckId = personalDeck.getFlashcardDeck().getId();
            this.status = personalDeck.getStatus();
            this.savingProgressStatus = personalDeck.getSavingProgressStatus();
        }
    }

    @Getter
    public static class DeckDetailResponseDto {

        //        PersonalDeck personalDeck;
        //        FlashcardDeck flashcardDeck;
        private Long id;
        private Long userId;
        private String name;
        private String nickname;
        private Long flashcardDeckId;
        private FlashcardDto flashcardDto;
        private FlashcardStatus status;
        private SavingProgressStatus savingProgressStatus;
        private int forkCount;
        private int wordCount;

        //        @Builder
//        public DeckDetailResponseDto(PersonalDeck personalDeck) {
//            this.personalDeck = personalDeck;
//        }
        public DeckDetailResponseDto(PersonalDeck personalDeck) {
            this.id = personalDeck.getId();
            this.userId = personalDeck.getUser().getId();
            this.name = personalDeck.getName();
            this.nickname = personalDeck.getUser().getNickname();
            this.flashcardDeckId = personalDeck.getFlashcardDeck().getId();
            this.flashcardDto = new FlashcardDto(personalDeck.getFlashcardDeck());
            this.status = personalDeck.getStatus();
            this.savingProgressStatus = personalDeck.getSavingProgressStatus();
            this.forkCount = personalDeck.getForkCount();
            this.wordCount = personalDeck.getWordCount();
        }

        @Builder
        public DeckDetailResponseDto() {
        }
    }

    @Getter
    public static class MessageOnlyResponseDto {

        private String message;

        //        private String ERROR;
        @Builder
        public MessageOnlyResponseDto(String message) {
            this.message = message;
        }

    }

    @Getter
    public static class DeckListResponseDto {

        private List<DeckTitleResponseDto> personalDeckList;

        public DeckListResponseDto(List<PersonalDeck> personalDeckList) {
            this.personalDeckList = personalDeckList.stream()
                .map(DeckTitleResponseDto::new).collect(Collectors.toList());
        }
    }

    @Getter
    public static class WordUpdateResponseDto {

        WordcardDto wordcard;

        @Builder
        public WordUpdateResponseDto(Wordcard wordcard) {

            this.wordcard = new WordcardDto(wordcard);
        }

        @Builder
        public WordUpdateResponseDto() {

        }
    }

}
