package com.npc.say_vr.domain.flashcards.dto;

import com.npc.say_vr.domain.flashcards.constant.FlashcardStatus;
import com.npc.say_vr.domain.flashcards.constant.SavingProgressStatus;
import com.npc.say_vr.domain.flashcards.domain.FlashcardDeck;
import com.npc.say_vr.domain.flashcards.domain.PersonalDeck;
import com.npc.say_vr.domain.flashcards.domain.Wordcard;
import java.util.List;
import java.util.stream.Collectors;
import lombok.Builder;
import lombok.Getter;

public class FlashcardsResponseDto {

    @Getter
    public static class WordcardDto {

        private String kor;
        private String eng;


        public WordcardDto(Wordcard wordcard) {
            this.eng = wordcard.getWord().getEnglish();
            this.kor = wordcard.getWord().getKorean();
        }
    }

    @Getter
    public static class FlashcardDto {

        private List<WordcardDto> wordcardList;

        public FlashcardDto(FlashcardDeck flashcardDeck) {
            this.wordcardList = flashcardDeck.getWordcards().stream().map(WordcardDto::new).collect(
                Collectors.toList());
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


    }

    @Getter
    public static class DeckCreateResponseDto {

        private PersonalDeck personalDeck;

        public DeckCreateResponseDto(PersonalDeck personalDeck) {
            this.personalDeck = personalDeck;
        }
    }

    @Getter
    public static class DeckDetailResponseDto {

        PersonalDeck personalDeck;
        //        FlashcardDeck flashcardDeck;
        private Long id;
        private Long userId;
        private String name;
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

        Wordcard wordcard;

        @Builder
        public WordUpdateResponseDto(Wordcard wordcard) {
            this.wordcard = wordcard;
        }

        @Builder
        public WordUpdateResponseDto() {

        }
    }

}
