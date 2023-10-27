package com.npc.say_vr.domain.game.service;

import com.npc.say_vr.domain.game.domain.Ranking;
import com.npc.say_vr.domain.game.repository.RankingRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.amqp.rabbit.core.RabbitTemplate;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Slf4j
@Service
@RequiredArgsConstructor
@Transactional(readOnly = true)
public class GameServiceImpl implements GameService {

    private static final String EXCAHGE_NAME = "sample.exchange";
    private final RabbitTemplate rabbitTemplate;
    private final RankingRepository rankingRepository;



    @Override
    public void registWaitingQueue(Long userId) {
        Ranking ranking = rankingRepository.findByUserId(userId).orElseThrow();
        String name = ranking.getTier().getName();
        rabbitTemplate.convertAndSend(EXCAHGE_NAME, name, name+"queue 등록");
    }
}
