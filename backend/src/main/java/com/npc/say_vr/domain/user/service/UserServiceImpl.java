package com.npc.say_vr.domain.user.service;

import static com.npc.say_vr.domain.user.constant.UserExceptionMessage.ALREADY_EXIST_USER;
import static com.npc.say_vr.domain.user.constant.UserExceptionMessage.NOT_EXIST_USER;

import com.npc.say_vr.domain.game.domain.Ranking;
import com.npc.say_vr.domain.game.domain.Tier;
import com.npc.say_vr.domain.game.repository.RankingRepository;
import com.npc.say_vr.domain.game.repository.TierRepository;
import com.npc.say_vr.domain.game.service.RankingService;
import com.npc.say_vr.domain.user.constant.UserStatus;
import com.npc.say_vr.domain.user.domain.User;
import com.npc.say_vr.domain.user.dto.CreateUserRequestDto;
import com.npc.say_vr.domain.user.dto.LoginUserRequestDto;
import com.npc.say_vr.domain.user.dto.LoginUserResponseDto;
import com.npc.say_vr.domain.user.dto.UserResponseDto.FileUploadResponseDto;
import com.npc.say_vr.domain.user.dto.UserResponseDto.TokenResponseDto;
import com.npc.say_vr.domain.user.dto.UserResponseDto.UserInfoResponseDto;
import com.npc.say_vr.domain.user.exception.UserExistException;
import com.npc.say_vr.domain.user.exception.UserNotFoundException;
import com.npc.say_vr.domain.user.repository.UserRepository;
import com.npc.say_vr.global.file.FileStore;
import com.npc.say_vr.global.util.JwtUtil;
import java.util.Map;
import java.util.Optional;
import javax.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;
import org.springframework.web.multipart.MultipartFile;

@Service
@RequiredArgsConstructor
@Transactional
public class UserServiceImpl implements UserService {

    private final UserRepository userRepository;
    private final FileStore fileStore;
    private final JwtUtil jwtUtil;
    private final RankingService rankingService;
    private final RankingRepository rankingRepository;
    private final TierRepository tierRepository;

    private static final Long CREATE_USER_POINT = 0L;


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
        Long rank = rankingService.readRank(userId);
        Ranking ranking = rankingRepository.findByUserId(userId).orElseThrow();

        return UserInfoResponseDto.builder().user(user).rank(rank).tier(ranking.getTier().getImage()).point(ranking.getPoint()).build();
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
    public String SaveUserProfileUrl(String profileUrl,String id) {
        return fileStore.storeBufferedImage(profileUrl,id);
    }

    @Override
    public boolean checkUserId(String email) {
        if(userRepository.findByEmail(email).isPresent()){
            return false;
        }
        return true;
    }

    @Override
    public boolean checkNickname(String nickname) {
        if(userRepository.findByNickname(nickname).isPresent()){
            return false;
        }
        return true;
    }

    @Override
    public void createUser(CreateUserRequestDto createUserRequestDto) {
        if(!checkUserId(createUserRequestDto.getEmail())) {
            // 예외처리
            return;

        }
        if(!checkNickname(createUserRequestDto.getNickname())) {
            // 예외처리
            return;
        }
        // TODO : 예외처리
        Tier tier = tierRepository.findById(1L).orElseThrow();

        User newUser = User.builder()
            .username(createUserRequestDto.getNickname())
            .email(createUserRequestDto.getEmail())
            .nickname(createUserRequestDto.getNickname())
            // TODO : 프로필 사진 넣기
//            .profile(imageUrl)
            .password(createUserRequestDto.getPassword())
            .userStatus(UserStatus.ACTIVE)
            .build();

        userRepository.save(newUser);

        Ranking ranking = Ranking.builder()
            .point(CREATE_USER_POINT)
            .tier(tier)
            .user(newUser)
            .build();

        rankingRepository.save(ranking);

    }

    @Override
    public LoginUserResponseDto loginUser(LoginUserRequestDto loginUserRequestDto) {
        // 예외처리
        User user = userRepository.findByEmailAndPassword(loginUserRequestDto.getEmail(),loginUserRequestDto.getPassword()).orElseThrow();

        TokenResponseDto tokenResponseDto = TokenResponseDto.builder()
                                        .accessToken(jwtUtil.createJwtToken(user.getId()))
                                        .refreshToken(jwtUtil.createRefreshToken(user.getId()))
                                        .build();
        return LoginUserResponseDto.builder().userId(user.getId()).tokenResponseDto(tokenResponseDto).build();
    }

    @Override
    public void logoutUser(Long userId, String authorization) {
         jwtUtil.logout(userId,authorization);
    }

    @Override
    public void updateNickname(Long userId, String nickname) {
        User user = userRepository.findById(userId)
            .orElseThrow(() -> new UserNotFoundException(NOT_EXIST_USER.getMessage()));

        user.updateName(nickname);
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

    @Override
    public TokenResponseDto createFacebookUser(Map<String, String> jsonData) throws Exception {
        RestTemplate restTemplate = new RestTemplate();
//        jsonData = new HashMap<>();
//        jsonData.put("accessToken","EAAUy2jzMxcABOx14tYmBTUTDwk1QL9vRS2tReqQ4WKm8YiNGXtl7eSRBzH19yPdgrNo5zvEHlCCO9IcpBQsnHGLRnSZAhUY9xwJPaUxS0YTweBKFhwLM3kHO4jOVw5mqzzq2ndtFbHGvBDP5VynAfYnMJrBaQmSsHemZAIGSkPD3ZCxUbjLoOFWkqKLpX8UAz5DOjKqB1bH98Abx3U4vgP2zNV8LxHSYSiaBf3U3yFZBUquOMhcu1iKmi1yMdPAuKZBXlAQZDZD");

        @SuppressWarnings("rawtypes")
        Map result = restTemplate.getForObject(
            "https://graph.facebook.com/v18.0/me?access_token={value1}&fields={value2}", // 요청할 URL
            Map.class, // 서버에서 받은 결과의 타입
            jsonData.get("accessToken"), // URL의 첫 번째 자리에 들어갈 값
            "id,name,email,picture" // 페이스북 측에 요청하는 로그인 사용자 정보
        );

        @SuppressWarnings("null")
        String email = (String) result.get("email");
        String name = (String) result.get("name");
        String url = (String) ((Map) ((Map) result.get("picture")).get("data")).get("url");
        String id = (String) result.get("id");

        User user = userRepository.findByEmail(email).get();

        if(user == null) {
            String imageUrl = SaveUserProfileUrl(url,id);
            User newUser = User.builder()
                .username(name)
                .email(email)
                .nickname(name)
                .profile(imageUrl)
                .userStatus(UserStatus.ACTIVE)
                .build();

            user = userRepository.save(newUser);
        }
        return TokenResponseDto.builder()
                .accessToken(jwtUtil.createJwtToken(user.getId()))
                .refreshToken(jwtUtil.createRefreshToken(user.getId()))
                .build();
    }
}
