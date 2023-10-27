package com.npc.say_vr.global.util;

import com.rabbitmq.client.Channel;
import java.io.IOException;
import lombok.extern.slf4j.Slf4j;
import org.springframework.amqp.core.Message;
import org.springframework.amqp.rabbit.annotation.Exchange;
import org.springframework.amqp.rabbit.annotation.Queue;
import org.springframework.amqp.rabbit.annotation.QueueBinding;
import org.springframework.amqp.rabbit.annotation.RabbitListener;
import org.springframework.stereotype.Component;

@Component
@Slf4j
public class RabbitMqListener {

    @RabbitListener(queues = "sample.queue")
    public void receiveMessage(final Message message) {
        log.info(message.toString());
    }

    @RabbitListener(bindings = @QueueBinding(
        value = @Queue(value = "bronze.queue", durable = "true"),
        exchange = @Exchange(value = "amp.direct"),
        key = "bronze"
    ))
    public void bronze(Message message, Channel channel) throws IOException {

    }

    @RabbitListener(bindings = @QueueBinding(
        value = @Queue(value = "silver.queue", durable = "true"),
        exchange = @Exchange(value = "amp.direct"),
        key = "silver"
    ))
    public void silver(Message message, Channel channel) throws IOException {

    }

    @RabbitListener(bindings = @QueueBinding(
        value = @Queue(value = "gold.queue", durable = "true"),
        exchange = @Exchange(value = "amp.direct"),
        key = "gold"
    ))
    public void gold(Message message, Channel channel) throws IOException {

    }
}
