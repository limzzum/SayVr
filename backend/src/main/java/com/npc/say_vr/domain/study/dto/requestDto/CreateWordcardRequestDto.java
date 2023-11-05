package com.npc.say_vr.domain.study.dto.requestDto;

import com.npc.say_vr.domain.flashcards.constant.WordcardStatus;
import com.npc.say_vr.domain.flashcards.domain.FlashcardDeck;
import com.npc.say_vr.domain.flashcards.domain.Word;
import com.npc.say_vr.domain.flashcards.domain.Wordcard;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@Builder
@AllArgsConstructor
public class CreateWordcardRequestDto {
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
