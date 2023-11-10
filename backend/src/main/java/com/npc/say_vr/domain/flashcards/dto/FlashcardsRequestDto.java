package com.npc.say_vr.domain.flashcards.dto;

import com.npc.say_vr.domain.flashcards.constant.FlashcardStatus;
import com.npc.say_vr.domain.flashcards.constant.SavingProgressStatus;
import com.npc.say_vr.domain.flashcards.constant.WordcardStatus;
import com.npc.say_vr.domain.flashcards.domain.FlashcardDeck;
import com.npc.say_vr.domain.flashcards.domain.PersonalDeck;
import com.npc.say_vr.domain.flashcards.domain.Word;
import com.npc.say_vr.domain.flashcards.domain.Wordcard;
import com.npc.say_vr.domain.user.domain.User;
import java.util.List;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

public class FlashcardsRequestDto {

    @Data
    @Builder
    @NoArgsConstructor
    @AllArgsConstructor
    public static class GetTranslationRequestDto {

        private String source;
        private String target;
        private String text;


    }

    @Data
    @Builder
    @NoArgsConstructor
    @AllArgsConstructor
    public static class CreateFlashcardsRequestDto {

        private String name;
        private String privacyStatus;

        public PersonalDeck createPersonalDeck(User user, FlashcardDeck flashcardDeck) {
            return PersonalDeck.builder()
                .user(user)
                .name(name)
                .flashcardDeck(flashcardDeck)
                .status(FlashcardStatus.valueOf(privacyStatus))
                .build();
        }


        public FlashcardDeck createBaseDeck(PersonalDeck personalDeck) {
            return FlashcardDeck.builder()
                .build();
        }
    }

    @Data
    @Builder
    @NoArgsConstructor
    @AllArgsConstructor
    public static class SearchRequestDto {

        private Long userId;
        private String type;
        private String keyword;

//        private List<String> tags;
//        private Integer page;
//        private Integer pageSize;

    }

    @Data
    @Builder
    @NoArgsConstructor
    @AllArgsConstructor
    public static class PageRequestDto {

        private Long userId;
        private String type;
        private List<String> tags;
        private String keyword;
        private Integer page;
        private Integer pageSize;

    }

    @Data
    @Builder
    @NoArgsConstructor
    @AllArgsConstructor
    public static class ForkRequestDto {

        private Long userId;
        private Long personalDeckId;

//        public PersonalDeck forkDeck(User user, FlashcardDeck deck) {
//            return PersonalDeck.builder()
////                .user(user)
////                .name()
////                .flashcardDeck(flashcardDeck)
////                .status(FlashcardStatus.valueOf(privacyStatus))
//                .build();
//        }
    }

    @Data
    @Builder
    @NoArgsConstructor
    @AllArgsConstructor
    public static class DeckUpdateRequestDto {

        private String savingProgressStatus;

        public SavingProgressStatus toEnum() {
            return SavingProgressStatus.valueOf(savingProgressStatus);
        }

    }

    @Data
    @Builder
    @NoArgsConstructor
    @AllArgsConstructor
    public static class DeckSettingsUpdateRequestDto {

        private String name;
        private String flashcardStatus;

        public FlashcardStatus toEnum() {
            return FlashcardStatus.valueOf(flashcardStatus);
        }

    }

    @Data
    @Builder
    @NoArgsConstructor
    @AllArgsConstructor
    public static class WordUpdateRequestDto {

        private SavingProgressStatus savingProgressStatus;

    }

    @Data
    @Builder
    @NoArgsConstructor
    @AllArgsConstructor
    public static class WordcardUpdateRequestDto {

        private String wordcardStatus;

        public WordcardStatus toEnum() {
            return WordcardStatus.valueOf(wordcardStatus);

        }
    }

    @Data
    @Builder
    @NoArgsConstructor
    @AllArgsConstructor
    public static class CreateWordcardRequestDto {

        private String kor;
        private String eng;


        public Wordcard createWordcard(FlashcardDeck flashcardDeck, Word word) {
            return Wordcard.builder()
                .flashcardDeck(flashcardDeck)
                .status(WordcardStatus.UNCHECKED)
                .word(word)
                .build();
        }


        public Word createWord() {
            return Word.builder()
                .english(eng)
                .korean(kor)
                .build();
        }
    }

    @Data
    @Builder
    @NoArgsConstructor
    @AllArgsConstructor
    public static class ReadDeckSearchRequestDto {

        private String keyword;
        private String sortBy; // TODO : ENUM으로 만들기
        private Long lastId;
        private int pageSize;

    }
}
