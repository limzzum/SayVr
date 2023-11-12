package com.npc.say_vr.domain.game.service;

import com.npc.say_vr.domain.game.dto.GameStatusDto;
import com.npc.say_vr.global.util.RedisUtil;
import java.time.LocalDateTime;
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
    private final RedisUtil redisUtil;


    private List<Long> games = new ArrayList<>();

    @Scheduled(fixedRate = 1000)
    public void checkGameTimers() {
        for (Long gameId : games){
            if (isTimeLimitExceeded(gameId)) {
                rabbitTemplate.convertAndSend(EXCHANGE_NAME, "alarm."+gameId,gameId);
            }
        }
    }

    public void addGameRoom(Long gameId) {
        System.out.println("스케줄러 게임 추가됨");
        games.add(gameId);
    }

    public void removeGameRoom(Long gameId) {
        games.remove(gameId);
    }

    private boolean isTimeLimitExceeded(Long gameId) {
        GameStatusDto gameStatusDto = redisUtil.getGameStatusList(String.valueOf(gameId));
        if(gameStatusDto.getQuizEndTime() != null){
            if(gameStatusDto.getQuizEndTime().isBefore(LocalDateTime.now())){
                gameStatusDto.setQuizEndTime(null);
                redisUtil.setGameStatusList(String.valueOf(gameId), gameStatusDto);
                return true;
            }
        }
        return false;
    }
}
