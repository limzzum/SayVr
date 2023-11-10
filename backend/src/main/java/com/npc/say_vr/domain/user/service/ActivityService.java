package com.npc.say_vr.domain.user.service;

import com.npc.say_vr.domain.study.constant.OptionType;
import com.npc.say_vr.domain.user.domain.User;
import com.npc.say_vr.domain.user.dto.ActivityResponseDto;
import com.npc.say_vr.domain.user.dto.UserResponseDto.FileUploadResponseDto;
import com.npc.say_vr.domain.user.dto.UserResponseDto.TokenResponseDto;
import com.npc.say_vr.domain.user.dto.UserResponseDto.UserInfoResponseDto;
import java.util.Map;
import org.springframework.web.multipart.MultipartFile;

public interface ActivityService {

    User readUser(Long userId);

    ActivityResponseDto readActivity(Long userId);

    void saveActicity(Long userId, OptionType optionType);



}
