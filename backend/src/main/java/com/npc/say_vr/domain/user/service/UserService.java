package com.npc.say_vr.domain.user.service;

import com.npc.say_vr.domain.user.dto.UserResponseDto.FileUploadResponseDto;
import com.npc.say_vr.domain.user.dto.UserResponseDto.UserInfoResponseDto;
import java.util.Map;
import org.springframework.web.multipart.MultipartFile;

public interface UserService {

    UserInfoResponseDto readUser(Long userId);

    FileUploadResponseDto updateUserProfileImg(Long userId, MultipartFile profileImg);

    void updateNickname(Long userId, String nickName);

    void deleteUser(Long userId);

    boolean isExistUser(Long userId);

    void createFacebookUser(Map<String, String> jsonData) throws Exception;

    String SaveUserProfileUrl(String profileUrl);

    //TODO : 페이스북 로그인

}
