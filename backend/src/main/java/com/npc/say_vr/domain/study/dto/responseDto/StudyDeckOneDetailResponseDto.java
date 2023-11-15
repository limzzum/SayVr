package com.npc.say_vr.domain.study.dto.responseDto;


import com.npc.say_vr.domain.study.constant.StudyRole;
import com.querydsl.core.annotations.QueryProjection;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@Builder
@AllArgsConstructor
@Getter
public class StudyDeckOneDetailResponseDto {

    private Long id;
    private String name;
    private Long flashcardDeckId;
    private FlashcardDto flashcardDto;
    private int wordCount;
    private StudyRole studyRole;

    @QueryProjection
    public StudyDeckOneDetailResponseDto(Long id, String name, Long flashcardDeckId,int wordCount) {
        this.id = id;
        this.name = name;
        this.flashcardDeckId = flashcardDeckId;
        this.wordCount = wordCount;
    }

    public void updateFlashcardDto(FlashcardDto flashcardDto,StudyRole studyRole) {
        this.flashcardDto = flashcardDto;
        this.studyRole = studyRole;
    }
}
