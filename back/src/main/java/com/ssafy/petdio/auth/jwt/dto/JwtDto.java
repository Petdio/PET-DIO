package com.ssafy.petdio.auth.jwt.dto;

import com.ssafy.petdio.model.entity.Role;
import lombok.Builder;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class JwtDto {

    private Long id;
    private String nickname;
    private Role role;

    @Builder
    public JwtDto(Long userId, String userNickname, Role role) {
        this.id = userId;
        this.nickname = userNickname;
        this.role = role;
    }
}