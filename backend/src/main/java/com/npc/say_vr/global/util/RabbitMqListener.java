package com.npc.say_vr.global.util;

import static com.npc.say_vr.domain.game.constant.GameResponseMessage.PLAYER_OUT_MESSAGE;

import com.npc.say_vr.domain.game.constant.SocketType;
import com.npc.say_vr.domain.game.dto.GameRequestDto.PlayerOutRequestDto;
import com.npc.say_vr.domain.game.dto.GameResponseDto.GameSocketResponseDto;
import com.npc.say_vr.domain.game.service.GameService;
import com.rabbitmq.client.Channel;
import java.io.IOException;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.amqp.core.Message;
import org.springframework.amqp.rabbit.annotation.Exchange;
import org.springframework.amqp.rabbit.annotation.Queue;
import org.springframework.amqp.rabbit.annotation.QueueBinding;
import org.springframework.amqp.rabbit.annotation.RabbitListener;
import org.springframework.amqp.rabbit.core.RabbitTemplate;
import org.springframework.context.event.EventListener;
import org.springframework.stereotype.Component;
import org.springframework.web.socket.messaging.SessionConnectedEvent;
import org.springframework.web.socket.messaging.SessionDisconnectEvent;

@Component
@RequiredArgsConstructor
@Slf4j
public class RabbitMqListener {

    private final RabbitTemplate rabbitTemplate;
    private final GameService gameService;
    private static final String EXCAHGE_NAME = "amq.topic";

    @RabbitListener(bindings = @QueueBinding(
        value = @Queue(value = "game.queue", durable = "true"),
        exchange = @Exchange(value = EXCAHGE_NAME),
        key = "alarm.*"
    ))
    public void bronze(Message message, Channel channel) throws IOException {
        //TODO: 알람만 받도록 해야함
        if(!message.getMessageProperties().getReceivedRoutingKey().equals("alarm.*")){
            System.out.println("알람 아님");
            System.out.println(message.toString());
            return;
        }
        byte[] body = message.getBody();
        String gameId = new String(body);
        log.info("{}번 게임방 퀴즈 제한시간 종료 메시지큐 리스너 호출됨 ", gameId);

        GameSocketResponseDto gameSocketResponseDto;
        if(gameService.isEndGame(Long.valueOf(gameId))){
            gameSocketResponseDto = GameSocketResponseDto.builder().socketType(SocketType.GAME_END)
                .data(gameService.getGameResult(Long.valueOf(gameId)))
                .build();
            rabbitTemplate.convertAndSend(EXCAHGE_NAME, "game." + gameId, gameSocketResponseDto);
            return;
        }

        String quiz = gameService.updateQuiz(Long.valueOf(gameId));
        gameSocketResponseDto = GameSocketResponseDto.builder().socketType(SocketType.QUIZ_TIME_OVER)
            .message(quiz)
            .build();
        rabbitTemplate.convertAndSend(EXCAHGE_NAME, "game." + gameId, gameSocketResponseDto);

    }

    @EventListener
    public void connectionListener(SessionConnectedEvent event){
        log.info("connected");
    }

//    @EventListener
//    public void connectionListener(SessionDisconnectEvent event){
//        log.info("disconnected");
//        Long userId = Long.valueOf(event.getUser().getName());
//        Long gameId = gameService.findGameIdByUserId(userId);
//
//        if(gameId == null){
//            throw new IllegalArgumentException("todo");
//        }
//        GameSocketResponseDto gameSocketResponseDto = GameSocketResponseDto.builder().socketType(SocketType.GAME_END)
//            .message(PLAYER_OUT_MESSAGE.getMessage())
//            .data(gameService.playerOutGame(PlayerOutRequestDto.builder().gameId(gameId)
//                .outUserId(userId).build()))
//            .build();
//        rabbitTemplate.convertAndSend(EXCAHGE_NAME, "game." + gameId, gameSocketResponseDto);
//    }
}
