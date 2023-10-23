package com.ssafy.petdio.auth.jwt.dto;

import lombok.Builder;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class JwtDto {

    private Long id;
    private String nickname;

    @Builder
    public JwtDto(Long id, String nickname) {
        this.id = id;
        this.nickname = nickname;
    }
}