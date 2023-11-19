package com.npc.say_vr.domain.user.dto;

import com.npc.say_vr.domain.user.domain.User;
import lombok.Builder;
import lombok.Getter;

public class UserResponseDto {

    @Getter
    public static class TokenResponseDto {

        private String accessToken;
        private String refreshToken;

        @Builder
        public TokenResponseDto(String accessToken, String refreshToken) {
            this.accessToken = accessToken;
            this.refreshToken = refreshToken;
        }
    }

    @Getter
    public static class UserInfoResponseDto {

        private String username;
        private String nickname;
        private String profile;
        private Long ranking;
        private String tier;
        private int point;

        @Builder
        public UserInfoResponseDto(User user, Long rank, String tier, int point) {
            this.username = user.getUsername();
            this.nickname = user.getNickname();
            this.profile = user.getProfile();
            this.ranking = rank;
            this.tier = tier;
            this.point = point;
        }
    }

    @Getter
    public static class FileUploadResponseDto {

        private String filePath;

        @Builder
        public FileUploadResponseDto(String filePath) {
            this.filePath = filePath;
        }
    }
}
