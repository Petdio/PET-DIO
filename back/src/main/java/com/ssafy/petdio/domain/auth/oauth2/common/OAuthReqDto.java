package com.ssafy.petdio.domain.auth.oauth2.common;

import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.ToString;

@Data
@NoArgsConstructor
@ToString
public class OAuthReqDto {
    private String code;
}