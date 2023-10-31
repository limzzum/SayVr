package com.npc.say_vr.domain.game.service;

import java.util.ArrayList;
import java.util.List;
import lombok.RequiredArgsConstructor;
import org.springframework.amqp.rabbit.core.RabbitTemplate;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Component;

@Component
@RequiredArgsConstructor
public class GameScheduler {
    private static final String EXCHANGE_NAME = "amq.topic";
    private final RabbitTemplate rabbitTemplate;
    private final GameService gameService;

    private List<Long> games = new ArrayList<>();

    @Scheduled(fixedRate = 1000)
    public void checkGameTimers() {
        for (Long gameId : games){
            if (gameService.isTimeLimitExceeded(gameId)) {
                rabbitTemplate.convertAndSend(EXCHANGE_NAME, "alarm." + gameId);
            }
        }
    }

    public void addGameRoom(Long gameId) {
        games.add(gameId);
    }

    public void removeGameRoom(Long gameId) {
        games.remove(gameId);
    }
}
