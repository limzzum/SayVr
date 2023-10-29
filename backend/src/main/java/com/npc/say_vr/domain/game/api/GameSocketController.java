package com.npc.say_vr.domain.game.api;

import com.npc.say_vr.domain.game.constant.SocketType;
import com.npc.say_vr.domain.game.dto.GameRequestDto.GameSocketRequestDto;
import com.npc.say_vr.domain.game.dto.GameResponseDto.GameSocketResponseDto;
import com.npc.say_vr.domain.game.dto.GameStatusDto;
import com.npc.say_vr.global.util.RedisUtil;
import javax.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.amqp.rabbit.core.RabbitTemplate;
import org.springframework.messaging.handler.annotation.DestinationVariable;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequiredArgsConstructor
@Transactional
public class GameSocketController {

    private final RabbitTemplate rabbitTemplate;
    private final RedisUtil redisUtil;
    private static final String EXCAHGE_NAME = "amq.topic";


    @MessageMapping("game.{gameId}")
    public void game(GameSocketRequestDto gameSocketRequestDto, @DestinationVariable String gameId){
        SocketType socketType = gameSocketRequestDto.getSocketType();
        if(socketType.equals(SocketType.GAME_INFO)){
            if(redisUtil.hasKeyGameStatusList(gameId)){
                GameStatusDto gameStatusDto = (GameStatusDto) redisUtil.getGameStatusList(gameId);
                GameSocketResponseDto gameSocketResponseDto = GameSocketResponseDto.builder().socketType(socketType)
                    .gameStatusDto(gameStatusDto).build();
                rabbitTemplate.convertAndSend(EXCAHGE_NAME, "room." + gameId, gameSocketResponseDto);
            }
            return;
        }

        GameSocketResponseDto gameSocketResponseDto = GameSocketResponseDto.builder().socketType(socketType)
            .text(gameSocketRequestDto.getText()).build();
        rabbitTemplate.convertAndSend(EXCAHGE_NAME, "room." + gameId, gameSocketResponseDto);
    }


}
