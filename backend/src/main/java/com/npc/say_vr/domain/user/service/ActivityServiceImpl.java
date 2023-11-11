package com.npc.say_vr.domain.user.service;

import static com.npc.say_vr.domain.user.constant.UserExceptionMessage.NOT_EXIST_USER;

import com.npc.say_vr.domain.study.constant.OptionType;
import com.npc.say_vr.domain.user.domain.Activity;
import com.npc.say_vr.domain.user.domain.User;
import com.npc.say_vr.domain.user.dto.ActivityDto;
import com.npc.say_vr.domain.user.dto.ActivityResponseDto;
import com.npc.say_vr.domain.user.exception.UserNotFoundException;
import com.npc.say_vr.domain.user.repository.UserRepository;
import com.npc.say_vr.domain.user.repository.activityRepository.ActivityRepository;
import com.npc.say_vr.global.file.FileStore;
import com.npc.say_vr.global.util.JwtUtil;
import java.time.LocalDate;
import java.util.List;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Slf4j
@Service
@RequiredArgsConstructor
@Transactional(readOnly = true)
public class ActivityServiceImpl implements ActivityService {

    private  final UserRepository userRepository;
    private final ActivityRepository activityRepository;

    @Override
    public User readUser(Long userId) {
        User user = userRepository.findById(userId)
            .orElseThrow(() -> new UserNotFoundException(NOT_EXIST_USER.getMessage()));
        return user;
    }

    @Override
    public ActivityResponseDto readActivity(Long userId) {
        LocalDate today = LocalDate.now();
        List<ActivityDto> activityDtos = activityRepository.readActvityYear(userId, today);

        return new ActivityResponseDto(activityDtos);
    }

    @Transactional
    @Override
    public void saveActicity(Long userId, OptionType optionType) {
        // TODO : 예외처리
        User user = readUser(userId);

        Activity activity = Activity.builder()
            .user(user)
            .optionType(optionType)
            .build();

        activityRepository.save(activity);

    }

}
