package com.ssafy.petdio.auth.oauth2.common;

import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
public class OAuthReqDto {
    private String code;
    private String fcmToken;
}