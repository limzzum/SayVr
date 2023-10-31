package com.npc.say_vr.global.util;

import com.npc.say_vr.domain.game.constant.SocketType;
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
        byte[] body = message.getBody();
        String gameId = new String(body);
        log.info("{}번 게임방 퀴즈 제한시간 종료 메시지큐 리스너 호출됨 ", gameId);

        GameSocketResponseDto gameSocketResponseDto;
        if(gameService.isEndGame(Long.valueOf(gameId))){
            gameSocketResponseDto = GameSocketResponseDto.builder().socketType(SocketType.GAME_END)
                .data(gameService.getGameResult(Long.valueOf(gameId)))
                .build();
            rabbitTemplate.convertAndSend(EXCAHGE_NAME, "room." + gameId, gameSocketResponseDto);
            return;
        }

        String quiz = gameService.updateQuiz(Long.valueOf(gameId));
        gameSocketResponseDto = GameSocketResponseDto.builder().socketType(SocketType.QUIZ_TIME_OVER)
            .message(quiz)
            .build();
        rabbitTemplate.convertAndSend(EXCAHGE_NAME, "room." + gameId, gameSocketResponseDto);

    }

    @EventListener
    public void connectionListener(SessionConnectedEvent event){
        log.info("connected");
        String name = event.getUser().getName();
        System.out.println("userId " + name);
    }

    @EventListener
    public void connectionListener(SessionDisconnectEvent event){
        log.info("disconnected");
        String name = event.getUser().getName();
        System.out.println("userId " + name);
    }
}
