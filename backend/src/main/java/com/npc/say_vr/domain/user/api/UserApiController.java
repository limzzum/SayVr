package com.npc.say_vr.domain.user.api;

import static com.npc.say_vr.domain.user.constant.UserResponseMessage.CREATE_ACCESS_TOKEN;
import static com.npc.say_vr.domain.user.constant.UserResponseMessage.SUCCESS_GET_USER_INFO;
import static com.npc.say_vr.domain.user.constant.UserResponseMessage.SUCCESS_NAME_UPDATE;
import static com.npc.say_vr.domain.user.constant.UserResponseMessage.SUCCESS_PROFILE_UPDATE;
import static com.npc.say_vr.domain.user.constant.UserResponseMessage.SUCCESS_USER_DELETE;

import com.npc.say_vr.domain.user.service.UserService;
import com.npc.say_vr.global.dto.ResponseDto;
import com.npc.say_vr.global.util.JwtUtil;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/user")
@Slf4j
public class UserApiController {

    private final JwtUtil jwtUtil;
    private final UserService userService;

    @GetMapping("")
    public ResponseEntity<?> getUserInfo(@AuthenticationPrincipal Long userId) {

        return ResponseEntity.ok(ResponseDto.builder()
            .message(SUCCESS_GET_USER_INFO.getMessage())
            .httpStatus(SUCCESS_GET_USER_INFO.getStatus())
            .data(userService.readUser(userId)).build());
    }

    @GetMapping("/refreshtoken")
    public ResponseEntity<?> refresh(@RequestHeader String refreshToken) {

        return ResponseEntity.ok(ResponseDto.builder()
            .message(CREATE_ACCESS_TOKEN.getMessage())
            .httpStatus(CREATE_ACCESS_TOKEN.getStatus())
            .data(jwtUtil.reCreateJwtToken(refreshToken)).build());
    }

    @PutMapping("/profileimg")
    public ResponseEntity<?> modifyProfileImg
        (@AuthenticationPrincipal Long userId, @RequestParam MultipartFile profile) {

        return ResponseEntity.ok(ResponseDto.builder()
            .message(SUCCESS_PROFILE_UPDATE.getMessage())
            .httpStatus(SUCCESS_PROFILE_UPDATE.getStatus())
            .data(userService.updateUserProfileImg(userId, profile)).build());
    }

    @PatchMapping("")
    public ResponseEntity<?> modifyName(
        @AuthenticationPrincipal Long userId, @RequestParam String name) {

        userService.updateNickname(userId, name);

        return ResponseEntity.ok(ResponseDto.builder()
            .message(SUCCESS_NAME_UPDATE.getMessage())
            .httpStatus(SUCCESS_NAME_UPDATE.getStatus()).build());
    }

    @DeleteMapping("")
    public ResponseEntity<?> deleteUser(@AuthenticationPrincipal Long userId) {

        userService.deleteUser(userId);

        return ResponseEntity.ok(ResponseDto.builder()
            .message(SUCCESS_USER_DELETE.getMessage())
            .httpStatus(SUCCESS_USER_DELETE.getStatus()).build());
    }

}
