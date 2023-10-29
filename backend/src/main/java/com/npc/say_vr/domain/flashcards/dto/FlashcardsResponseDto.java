package com.npc.say_vr.domain.flashcards.dto;

import com.npc.say_vr.domain.flashcards.domain.FlashcardDeck;
import com.npc.say_vr.domain.flashcards.domain.PersonalDeck;
import com.npc.say_vr.domain.flashcards.domain.Wordcard;
import lombok.Builder;
import lombok.Getter;

public class FlashcardsResponseDto {

    @Builder
    public FlashcardsResponseDto() {
    }

    @Getter
    public static class DeckDetailResponseDto {

        PersonalDeck personalDeck;
        FlashcardDeck flashcardDeck;

        @Builder
        public DeckDetailResponseDto(PersonalDeck personalDeck, FlashcardDeck flashcardDeck) {
            this.personalDeck = personalDeck;
            this.flashcardDeck = flashcardDeck;
        }

        @Builder
        public DeckDetailResponseDto() {
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
