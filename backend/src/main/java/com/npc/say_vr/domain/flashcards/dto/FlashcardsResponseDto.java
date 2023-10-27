package com.npc.say_vr.domain.flashcards.dto;

import com.npc.say_vr.domain.flashcards.domain.PersonalDeck;
import lombok.Builder;
import lombok.Getter;

public class FlashcardsResponseDto {

    @Getter
    public static class DeckDetailResponseDto {

        PersonalDeck personalDeck;

        @Builder
        public DeckDetailResponseDto(PersonalDeck personalDeck) {
            this.personalDeck = personalDeck;
        }
    }

}
