package com.npc.say_vr.global.config;

import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@Configuration
public class WebConfig implements WebMvcConfigurer {

    @Override
    public void addCorsMappings(CorsRegistry registry) {
        registry.addMapping("/**")
                .allowedOrigins("http://localhost:3000", "http://k9a501.p.ssafy.io", "https://k9a501.p.ssafy.io")
                .allowedOriginPatterns("*")
                .allowedHeaders("*")
                .allowCredentials(false)
                .allowedMethods("GET", "POST", "PUT", "DELETE", "PATCH");
    }
}


