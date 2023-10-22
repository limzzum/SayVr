package com.npc.say_vr.global.filter;


import static com.npc.say_vr.global.error.constant.ExceptionMessage.FILE_SIZE_LIMIT_EXCEEDED;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.npc.say_vr.global.dto.ResponseDto;
import java.io.IOException;
import javax.servlet.FilterChain;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import org.springframework.http.MediaType;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;

@Component
public class FileSizeExceptionFilter extends OncePerRequestFilter {


    @Override
    protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response,
        FilterChain filterChain) throws ServletException, IOException {
        try {
            filterChain.doFilter(request, response);
        } catch (Exception ex) {
            response.setStatus(400);
            response.setContentType(MediaType.APPLICATION_JSON_VALUE);
            response.setCharacterEncoding("UTF-8");
            String json = new ObjectMapper().writeValueAsString(
                ResponseDto.builder().message(FILE_SIZE_LIMIT_EXCEEDED.getMessage()).build());
            response.getWriter().write(json);

        }
    }
}
