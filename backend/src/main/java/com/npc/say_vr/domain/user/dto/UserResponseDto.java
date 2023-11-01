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

        private String name;
        private String profile;
        private Long ranking;
        private String tier;

        @Builder
        public UserInfoResponseDto(User user) {
            this.name = user.getUsername();
            this.profile = user.getProfile();
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
