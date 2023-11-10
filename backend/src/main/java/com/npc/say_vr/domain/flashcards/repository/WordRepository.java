package com.npc.say_vr.domain.flashcards.repository;

import com.npc.say_vr.domain.flashcards.domain.Word;
import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;

public interface WordRepository extends JpaRepository<Word, Long> {

    //TODO 단어 추가 자동완성

    Word findByEnglishAndKorean(String english, String korean);

    List<Word> findByEnglishIgnoreCase(String english);
    List<Word> findByKoreanIgnoreCase(String korean);

}
