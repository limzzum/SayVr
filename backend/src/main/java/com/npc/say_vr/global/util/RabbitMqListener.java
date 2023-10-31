package com.npc.say_vr.global.util;

import lombok.extern.slf4j.Slf4j;
import org.springframework.amqp.core.Message;
import org.springframework.amqp.rabbit.annotation.RabbitListener;
import org.springframework.stereotype.Component;

@Component
@Slf4j
public class RabbitMqListener {

    @RabbitListener(queues = "sample.queue")
    public void receiveMessage(final Message message) {
        log.info(message.toString());
    }
}
