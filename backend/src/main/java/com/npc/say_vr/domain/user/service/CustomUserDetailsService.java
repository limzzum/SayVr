package com.npc.say_vr.domain.user.service;

import com.npc.say_vr.domain.user.domain.CustomUserDetails;
import com.npc.say_vr.domain.user.domain.User;
import com.npc.say_vr.domain.user.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class CustomUserDetailsService implements UserDetailsService {

    private final UserRepository userRepository;

    @Override
    public UserDetails loadUserByUsername(String userId) throws UsernameNotFoundException {
        User user = userRepository.findById(Long.valueOf(userId)).orElseThrow();
        return CustomUserDetails.builder().user(user).build();
    }
}
