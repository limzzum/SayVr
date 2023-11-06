package com.npc.say_vr.domain.study.dto.responseDto;

import com.npc.say_vr.domain.flashcards.constant.WordcardStatus;
import com.npc.say_vr.domain.flashcards.domain.Wordcard;
import com.querydsl.core.annotations.QueryProjection;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@Builder
public class WordcardDto {

    private Long id;
    private String kor;
    private String eng;
    private WordcardStatus wordcardStatus;

    @QueryProjection
    public WordcardDto(Long id, String kor, String eng, WordcardStatus wordcardStatus) {
        this.id = id;
        this.kor = kor;
        this.eng = eng;
        this.wordcardStatus = wordcardStatus;
    }

    public WordcardDto(Wordcard wordcard) {
        this.id = wordcard.getId();
        this.eng = wordcard.getWord().getEnglish();
        this.kor = wordcard.getWord().getKorean();
        this.wordcardStatus = wordcard.getStatus();
    }
}
