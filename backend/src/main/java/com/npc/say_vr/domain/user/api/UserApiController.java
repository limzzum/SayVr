package com.npc.say_vr.domain.user.api;

import static com.npc.say_vr.domain.user.constant.UserResponseMessage.CREATE_ACCESS_TOKEN;
import static com.npc.say_vr.domain.user.constant.UserResponseMessage.SUCCESS_GET_USER_INFO;
import static com.npc.say_vr.domain.user.constant.UserResponseMessage.SUCCESS_NAME_UPDATE;
import static com.npc.say_vr.domain.user.constant.UserResponseMessage.SUCCESS_PROFILE_UPDATE;
import static com.npc.say_vr.domain.user.constant.UserResponseMessage.SUCCESS_USER_DELETE;

import com.npc.say_vr.domain.user.constant.UserStatus;
import com.npc.say_vr.domain.user.domain.User;
import com.npc.say_vr.domain.user.repository.UserRepository;
import com.npc.say_vr.domain.user.service.UserService;
import com.npc.say_vr.global.dto.ResponseDto;
import com.npc.say_vr.global.util.JwtUtil;
import java.util.HashMap;
import java.util.Map;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.client.RestTemplate;
import org.springframework.web.multipart.MultipartFile;

@CrossOrigin
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

    @PostMapping("/facebookLogin")
    public ResponseEntity<?> facebookLogin(@RequestBody Map<String, String> jsonData) throws Exception {

//        RestTemplate restTemplate = new RestTemplate();
////        jsonData = new HashMap<>();
////        jsonData.put("accessToken","EAAUy2jzMxcABOx14tYmBTUTDwk1QL9vRS2tReqQ4WKm8YiNGXtl7eSRBzH19yPdgrNo5zvEHlCCO9IcpBQsnHGLRnSZAhUY9xwJPaUxS0YTweBKFhwLM3kHO4jOVw5mqzzq2ndtFbHGvBDP5VynAfYnMJrBaQmSsHemZAIGSkPD3ZCxUbjLoOFWkqKLpX8UAz5DOjKqB1bH98Abx3U4vgP2zNV8LxHSYSiaBf3U3yFZBUquOMhcu1iKmi1yMdPAuKZBXlAQZDZD");
//
//        @SuppressWarnings("rawtypes")
//        Map result = restTemplate.getForObject(
//            "https://graph.facebook.com/v18.0/me?access_token={value1}&fields={value2}", // 요청할 URL
//            Map.class, // 서버에서 받은 결과의 타입
//            jsonData.get("accessToken"), // URL의 첫 번째 자리에 들어갈 값
//            "id,name,email,picture" // 페이스북 측에 요청하는 로그인 사용자 정보
//        );
//
//        System.out.println(result.toString());
//
//        @SuppressWarnings("null")
//        String email = (String) result.get("email");
//        String name = (String) result.get("name");
//        String url = (String) ((Map) ((Map) result.get("picture")).get("data")).get("url");
//        System.out.println(url);
//        // 기존 회원 정보 가져오기
//        User user = userService.get(email);
////        if (user == null) {
////             페이스북에서 받은 최소 정보를 가지고 회원 가입을 위한 객체를 준비한다.
////        User user = User.builder()
////                .userStatus(UserStatus.ACTIVE)
////                    .nickname(name)
////            .profile()
////            .email()
////                        .username(email)
////                            .build();
////
////        }
////        userRepository.save(user);
//
//        Map<String, String> map = new HashMap<>();
//
//        map.put("name",name);

        userService.createFacebookUser(jsonData);

        return ResponseEntity.ok(ResponseDto.builder()
            .message(SUCCESS_NAME_UPDATE.getMessage())
//                .data(map)
            .httpStatus(SUCCESS_NAME_UPDATE.getStatus()).build());
    }

}
