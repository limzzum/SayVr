package com.npc.say_vr.domain.game.api;

import lombok.RequiredArgsConstructor;
import org.springframework.amqp.rabbit.core.RabbitTemplate;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/game")
public class RabbitMqController {

    private static final String EXCAHGE_NAME = "sample.exchange";
    private final RabbitTemplate rabbitTemplate;

    @GetMapping("/wait")
    public String samplePublish() {
        rabbitTemplate.convertAndSend(EXCAHGE_NAME, "sample.routing.#", "RabbitMQ + SpringBoot = Success");
        return "Message sending!";
    }

}
