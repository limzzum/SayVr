package com.npc.say_vr.domain.user.service;

import static com.npc.say_vr.domain.user.constant.UserExceptionMessage.ALREADY_EXIST_USER;
import static com.npc.say_vr.domain.user.constant.UserExceptionMessage.NOT_EXIST_USER;

import com.npc.say_vr.domain.user.domain.User;
import com.npc.say_vr.domain.user.dto.UserResponseDto.FileUploadResponseDto;
import com.npc.say_vr.domain.user.dto.UserResponseDto.UserInfoResponseDto;
import com.npc.say_vr.domain.user.exception.UserExistException;
import com.npc.say_vr.domain.user.exception.UserNotFoundException;
import com.npc.say_vr.domain.user.repository.UserRepository;
import com.npc.say_vr.global.file.FileStore;
import java.util.Optional;
import javax.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

@Service
@RequiredArgsConstructor
@Transactional
public class UserServiceImpl implements UserService {

    private final UserRepository userRepository;
    private final FileStore fileStore;

    private Long createUser(User user) {
        if (isExistUser(user.getId())) {
            throw new UserExistException(ALREADY_EXIST_USER.getMessage());
        }
        User saved = userRepository.save(user);
        return saved.getId();
    }

    @Override
    public UserInfoResponseDto readUser(Long userId) {
        User user = userRepository.findById(userId)
            .orElseThrow(() -> new UserNotFoundException(NOT_EXIST_USER.getMessage()));
        return UserInfoResponseDto.builder().user(user).build();
    }

    @Override
    public FileUploadResponseDto updateUserProfileImg(Long userId, MultipartFile profileImg) {
        String filePath = fileStore.storeFile(profileImg);
        User user = userRepository.findById(userId)
            .orElseThrow(() -> new UserNotFoundException(NOT_EXIST_USER.getMessage()));

        fileStore.deleteFile(user.getProfile());
        user.updateProfile(filePath);
        return FileUploadResponseDto.builder().filePath(filePath).build();
    }

    @Override
    public void updateUserName(Long userId, String name) {
        User user = userRepository.findById(userId)
            .orElseThrow(() -> new UserNotFoundException(NOT_EXIST_USER.getMessage()));

        user.updateName(name);
    }

    @Override
    public void deleteUser(Long userId) {
        User user = userRepository.findById(userId)
            .orElseThrow(() -> new UserNotFoundException(NOT_EXIST_USER.getMessage()));
        user.signOut();
    }

    @Override
    public boolean isExistUser(Long userId) {
        Optional<User> user = userRepository.findById(userId);
        return user.isPresent();
    }

}
