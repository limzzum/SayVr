package com.npc.say_vr.domain.flashcards.dto;

import com.npc.say_vr.domain.flashcards.constant.FlashcardStatus;
import com.npc.say_vr.domain.flashcards.domain.FlashcardDeck;
import com.npc.say_vr.domain.flashcards.domain.PersonalDeck;
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

        public PersonalDeck forkDeck(User user, FlashcardDeck deck) {
            return PersonalDeck.builder()
//                .user(user)
//                .name()
//                .flashcardDeck(flashcardDeck)
//                .status(FlashcardStatus.valueOf(privacyStatus))
                .build();
        }
    }

}
