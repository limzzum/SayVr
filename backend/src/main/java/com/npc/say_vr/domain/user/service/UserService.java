package com.npc.say_vr.domain.user.service;

import com.npc.say_vr.domain.user.dto.UserResponseDto.FileUploadResponseDto;
import com.npc.say_vr.domain.user.dto.UserResponseDto.UserInfoResponseDto;
import org.springframework.web.multipart.MultipartFile;

public interface UserService {

    UserInfoResponseDto readUser(Long userId);

    FileUploadResponseDto updateUserProfileImg(Long userId, MultipartFile profileImg);

    void updateUserName(Long userId, String name);

    void deleteUser(Long userId);

    boolean isExistUser(Long userId);

    //TODO : 페이스북 로그인

}
