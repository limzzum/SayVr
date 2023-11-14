package com.npc.say_vr.domain.user.api;
import static com.npc.say_vr.domain.user.constant.UserResponseMessage.LOGIN_SUCCESS;
import static com.npc.say_vr.domain.user.constant.UserResponseMessage.CREATE_ACCESS_TOKEN;
import static com.npc.say_vr.domain.user.constant.UserResponseMessage.SUCCESS_GET_USER_INFO;
import static com.npc.say_vr.domain.user.constant.UserResponseMessage.SUCCESS_NAME_UPDATE;
import static com.npc.say_vr.domain.user.constant.UserResponseMessage.SUCCESS_PROFILE_UPDATE;
import static com.npc.say_vr.domain.user.constant.UserResponseMessage.SUCCESS_USER_DELETE;
import static com.npc.say_vr.domain.user.constant.UserResponseMessage.SUCCESS_ACTIVITY_READ;
import static com.npc.say_vr.domain.user.constant.UserResponseMessage.SUCCESS_CEHCKNICKNAME_READ;
import static com.npc.say_vr.domain.user.constant.UserResponseMessage.SUCCESS_CEHCKEMAIL_READ;
import static com.npc.say_vr.domain.user.constant.UserResponseMessage.SUCCESS_USER_CREATE;
import com.npc.say_vr.domain.user.dto.CreateUserRequestDto;
import com.npc.say_vr.domain.user.dto.LoginUserRequestDto;
import com.npc.say_vr.domain.user.service.ActivityService;
import com.npc.say_vr.domain.user.service.UserService;
import com.npc.say_vr.global.dto.ResponseDto;
import com.npc.say_vr.global.util.JwtUtil;
import java.util.Map;
import javax.servlet.http.HttpServletRequest;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpHeaders;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
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
    private final ActivityService activityService;

    @GetMapping("")
    public ResponseEntity<?> getUserInfo(@AuthenticationPrincipal Long userId) {

        return ResponseEntity.ok(ResponseDto.builder()
            .message(SUCCESS_GET_USER_INFO.getMessage())
            .httpStatus(SUCCESS_GET_USER_INFO.getStatus())
            .data(userService.readUser(userId)).build());
    }

    @GetMapping("/active")
    public ResponseEntity<?> getUserActive(@AuthenticationPrincipal Long userId) {
        return ResponseEntity.ok(ResponseDto.builder()
            .message(SUCCESS_ACTIVITY_READ.getMessage())
            .httpStatus(SUCCESS_ACTIVITY_READ.getStatus())
            .data(activityService.readActivity(userId)).build());
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

    @PostMapping("/facebookLogin")
    public ResponseEntity<?> facebookLogin(@RequestBody Map<String, String> jsonData) throws Exception {
        userService.createFacebookUser(jsonData);
        return ResponseEntity.ok(ResponseDto.builder()
            .message(LOGIN_SUCCESS.getMessage())
            .data(userService.createFacebookUser(jsonData))
            .httpStatus(LOGIN_SUCCESS.getStatus()).build());
    }

    @GetMapping("/idCheck/{email}")
    public ResponseEntity<?> checkId(@PathVariable String email) {
        return ResponseEntity.ok(ResponseDto.builder()
            .message(SUCCESS_CEHCKEMAIL_READ.getMessage())
                .data(userService.checkUserId(email))
            .httpStatus(SUCCESS_CEHCKEMAIL_READ.getStatus()).build());
    }

    @GetMapping("/nicknameCheck/{nickname}")
    public ResponseEntity<?> checkNickname(@PathVariable String nickname) {

        return ResponseEntity.ok(ResponseDto.builder()
            .message(SUCCESS_CEHCKNICKNAME_READ.getMessage())
            .data(userService.checkNickname(nickname))
            .httpStatus(SUCCESS_CEHCKNICKNAME_READ.getStatus()).build());
    }

    @PostMapping("")
    public ResponseEntity<?> createUser(@RequestBody CreateUserRequestDto createUserRequestDto) {
        userService.createUser(createUserRequestDto);
        return ResponseEntity.ok(ResponseDto.builder()
            .message(SUCCESS_USER_CREATE.getMessage())
            .httpStatus(SUCCESS_USER_CREATE.getStatus()).build());
    }

    @PostMapping("/login")
    public ResponseEntity<?> loginUser(@RequestBody LoginUserRequestDto loginUserRequestDto) {

        return ResponseEntity.ok(ResponseDto.builder()
            .message(LOGIN_SUCCESS.getMessage())
            .data(userService.loginUser(loginUserRequestDto))
            .httpStatus(LOGIN_SUCCESS.getStatus()).build());
    }

    @PostMapping("/logout")
    public ResponseEntity<?> logoutUser(@AuthenticationPrincipal Long userId, HttpServletRequest request) {
        System.out.println("테스트으으으으으으으으으으트트트트ㅡ트ㅡ트트트트");
        System.out.println(userId);
        String authorization = request.getHeader(HttpHeaders.AUTHORIZATION);
        userService.logoutUser(userId,authorization);
        return ResponseEntity.ok(ResponseDto.builder()
                .message(LOGIN_SUCCESS.getMessage())
                .httpStatus(LOGIN_SUCCESS.getStatus()).build());
    }

}
