package com.npc.say_vr.global.error;

import static com.npc.say_vr.global.error.constant.ExceptionMessage.NOT_ALLOW_USER;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.npc.say_vr.global.dto.ResponseDto;
import java.io.IOException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import org.springframework.http.MediaType;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.web.AuthenticationEntryPoint;
import org.springframework.stereotype.Component;

@Component
public class WebAuthenticationEntryPoint implements AuthenticationEntryPoint {

    @Override
    public void commence(HttpServletRequest request, HttpServletResponse response,
        AuthenticationException authException) throws IOException {
        response.setStatus(400);
        response.setContentType(MediaType.APPLICATION_JSON_VALUE);
        response.setCharacterEncoding("UTF-8");
        String json = new ObjectMapper().writeValueAsString(
            ResponseDto.builder().message(NOT_ALLOW_USER.getMessage()).build());
        response.getWriter().write(json);
    }
}