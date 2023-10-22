package com.npc.say_vr.global.config.security;

import com.npc.say_vr.global.error.WebAuthenticationEntryPoint;
import com.npc.say_vr.global.filter.FileSizeExceptionFilter;
import com.npc.say_vr.global.filter.JwtExceptionFilter;
import com.npc.say_vr.global.filter.JwtFilter;
import com.npc.say_vr.global.util.JwtUtil;
import lombok.RequiredArgsConstructor;
import org.springframework.boot.web.servlet.FilterRegistrationBean;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;

@Configuration
@EnableWebSecurity
@RequiredArgsConstructor
public class SecurityConfig {

    private final JwtUtil jwtUtil;
    private final JwtExceptionFilter jwtExceptionFilter;
    private final WebAuthenticationEntryPoint webAuthenticationEntryPoint;

    @Bean
    public FilterRegistrationBean<FileSizeExceptionFilter> customFilter() {
        FilterRegistrationBean<FileSizeExceptionFilter> registrationBean = new FilterRegistrationBean<>();
        registrationBean.setFilter(new FileSizeExceptionFilter());
        registrationBean.addUrlPatterns("/api/user/profileimg");
        return registrationBean;
    }

    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity httpSecurity) throws Exception {
        return httpSecurity
            .sessionManagement()
            .sessionCreationPolicy(SessionCreationPolicy.STATELESS)
            .and()
            .httpBasic().disable()
            .csrf().disable()
            .cors().and()
            .authorizeRequests()
            .antMatchers("/api/user/oauth/kakao/**").permitAll()
            .requestMatchers(request -> {
                String code = request.getParameter("code");
                return code != null;
            }).permitAll()
            .antMatchers("/api/user/refreshtoken").permitAll()
            .antMatchers("/profile").permitAll()
            .antMatchers("/health").permitAll()
            .anyRequest().authenticated()
            .and()
            .exceptionHandling()
            .authenticationEntryPoint(webAuthenticationEntryPoint)
            .and()
            .addFilterBefore(new JwtFilter(jwtUtil),
                UsernamePasswordAuthenticationFilter.class)
            .addFilterBefore(jwtExceptionFilter, JwtFilter.class)
            .build();
    }

}
