package com.npc.say_vr.global.config;

import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Configuration;
import org.springframework.messaging.simp.config.MessageBrokerRegistry;
import org.springframework.util.AntPathMatcher;
import org.springframework.web.socket.config.annotation.EnableWebSocketMessageBroker;
import org.springframework.web.socket.config.annotation.StompEndpointRegistry;
import org.springframework.web.socket.config.annotation.WebSocketMessageBrokerConfigurer;

@Configuration
@RequiredArgsConstructor
@EnableWebSocketMessageBroker
public class WebSocketConfig implements WebSocketMessageBrokerConfigurer {

    @Value("${spring.rabbitmq.host}")
    private String rabbitmqHost;

    @Value("${spring.rabbitmq.username}")
    private String rabbitmqUser;

    @Value("${spring.rabbitmq.password}")
    private String rabbitmqPassword;

    @Override
    public void configureMessageBroker(MessageBrokerRegistry registry) {
        registry.setPathMatcher(new AntPathMatcher("."));
        registry.setApplicationDestinationPrefixes("/pub");

        registry.enableStompBrokerRelay("/queue", "/topic")
            .setRelayHost(rabbitmqHost)
            .setRelayPort(61613)
            .setSystemLogin(rabbitmqUser)
            .setSystemPasscode(rabbitmqPassword)
            .setClientLogin(rabbitmqUser)
            .setClientPasscode(rabbitmqPassword);
    }

    @Override
    public void registerStompEndpoints(StompEndpointRegistry registry) {
        registry.addEndpoint("/api/ws")
            .setAllowedOriginPatterns("*");
    }

}

