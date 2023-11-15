package com.npc.say_vr.domain.study.dto.responseDto;

import com.npc.say_vr.domain.flashcards.domain.Wordcard;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@Builder
@AllArgsConstructor
public class WordUpdateResponseDto {

   WordcardDto wordcard;
   String errorMessage;
}
