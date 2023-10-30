package com.npc.say_vr.global.util;

import lombok.extern.slf4j.Slf4j;
import org.springframework.context.event.EventListener;
import org.springframework.stereotype.Component;
import org.springframework.web.socket.messaging.SessionConnectedEvent;
import org.springframework.web.socket.messaging.SessionDisconnectEvent;

@Component
@Slf4j
public class RabbitMqListener {

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
