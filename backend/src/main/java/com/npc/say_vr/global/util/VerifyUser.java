package com.npc.say_vr.global.util;

import static com.npc.say_vr.global.error.constant.ExceptionMessage.NOT_VERIFIED_USER;

import com.npc.say_vr.global.error.exception.NotVerifiedUserException;
import org.springframework.security.core.context.SecurityContextHolder;

public class VerifyUser {

    public static void verifyUser(Long userId) {
        Long curUserId = (Long) SecurityContextHolder.getContext().getAuthentication()
            .getPrincipal();
        if (!curUserId.equals(userId)) {
            throw new NotVerifiedUserException(NOT_VERIFIED_USER.getMessage());
        }
    }
}
