package com.npc.say_vr.domain.user.service;

import com.npc.say_vr.domain.user.dto.CreateUserRequestDto;
import com.npc.say_vr.domain.user.dto.LoginUserRequestDto;
import com.npc.say_vr.domain.user.dto.LoginUserResponseDto;
import com.npc.say_vr.domain.user.dto.UserResponseDto.FileUploadResponseDto;
import com.npc.say_vr.domain.user.dto.UserResponseDto.TokenResponseDto;
import com.npc.say_vr.domain.user.dto.UserResponseDto.UserInfoResponseDto;
import java.util.Map;
import javax.servlet.http.HttpServletRequest;
import org.springframework.web.multipart.MultipartFile;

public interface UserService {

    UserInfoResponseDto readUser(Long userId);

    FileUploadResponseDto updateUserProfileImg(Long userId, MultipartFile profileImg);

    void updateNickname(Long userId, String nickName);

    void deleteUser(Long userId);

    boolean isExistUser(Long userId);

    TokenResponseDto createFacebookUser(Map<String, String> jsonData) throws Exception;

    String SaveUserProfileUrl(String profileUrl,String id);

    boolean checkUserId(String email);

    boolean checkNickname(String nickname);

    void createUser(CreateUserRequestDto createUserRequestDto);

    LoginUserResponseDto loginUser(LoginUserRequestDto loginUserRequestDto);

    void logoutUser(Long userId, String authorization);

    //TODO : 페이스북 로그인

}
