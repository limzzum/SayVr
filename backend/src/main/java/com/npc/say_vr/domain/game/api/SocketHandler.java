package com.npc.say_vr.domain.game.api;

import java.util.ArrayList;
import java.util.List;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Component;
import org.springframework.web.socket.CloseStatus;
import org.springframework.web.socket.WebSocketSession;
import org.springframework.web.socket.handler.TextWebSocketHandler;


@Component
@Slf4j
public class SocketHandler extends TextWebSocketHandler {

    private static List<WebSocketSession> sessions = new ArrayList<>();

    @Override
    public void afterConnectionEstablished(WebSocketSession session) throws Exception {
        Long userId = Long.valueOf(session.getPrincipal().getName());
        System.out.println("userId : "+userId);
        log.info("연결됨");
        sessions.add(session);
        System.out.println(session.toString());

    }

    @Override
    public void afterConnectionClosed(WebSocketSession session, CloseStatus closeStatus)
        throws Exception {

    }

}

