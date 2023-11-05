package com.npc.say_vr.domain.study.dto.responseDto;

import com.npc.say_vr.domain.flashcards.constant.WordcardStatus;
import com.npc.say_vr.domain.flashcards.domain.FlashcardDeck;
import java.util.List;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@Builder
public class FlashcardDto {

    private List<WordcardDto> wordcardList;

    @Builder
    public FlashcardDto(List<WordcardDto> wordcardList) {
        this.wordcardList = wordcardList;
    }
}
