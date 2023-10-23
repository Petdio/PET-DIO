package com.ssafy.petdio.model.dto;

import lombok.*;

public class UserDTO {
    @Getter
    @Setter
    @ToString
    @Builder
    @AllArgsConstructor
    @NoArgsConstructor
    public static class LoginResponse {
        private Long userId;
        private String accessToken;
        private String refreshToken;
    }
}
