package com.npc.say_vr.domain.game.api;

import com.npc.say_vr.domain.game.constant.SocketType;
import com.npc.say_vr.domain.game.dto.GameRequestDto.GameSocketRequestDto;
import com.npc.say_vr.domain.game.dto.GameResponseDto.GameSocketResponseDto;
import com.npc.say_vr.domain.game.dto.GameStatusDto;
import com.npc.say_vr.domain.game.service.GameService;
import com.npc.say_vr.global.util.RedisUtil;
import javax.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.amqp.rabbit.core.RabbitTemplate;
import org.springframework.messaging.handler.annotation.DestinationVariable;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequiredArgsConstructor
@Transactional
@Slf4j
public class GameSocketController {

    private final RabbitTemplate rabbitTemplate;
    private final RedisUtil redisUtil;
    private final GameService gameService;

    private static final String EXCAHGE_NAME = "amq.topic";


    @MessageMapping("game.{gameId}")
    public void game(GameSocketRequestDto gameSocketRequestDto, @DestinationVariable String gameId, @AuthenticationPrincipal Long userId){
        log.info("game 웹소켓 메시지 pull");
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

        String text = gameSocketRequestDto.getText();
        if(gameService.checkQuizAnswer(Long.valueOf(gameId), text)){
            /*TODO : 정답 체크 후 게임 상태 업데이트.
            * 정답이면 다음문제 생성 & 상태 업데이트 후 리턴
            * 마지막 라운드인 경우 결과 출력
            * */
        }

        GameSocketResponseDto gameSocketResponseDto = GameSocketResponseDto.builder().socketType(socketType)
            .text(gameSocketRequestDto.getText()).build();
        rabbitTemplate.convertAndSend(EXCAHGE_NAME, "room." + gameId, gameSocketResponseDto);
    }


}
