package com.ssafy.petdio.model.dto;

import com.ssafy.petdio.model.entity.User;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class UserResponseDto {

    private String email;
    private String nickname;

    public UserResponseDto toUserResponseDto(User user) {
        return UserResponseDto.builder()
                .email(user.getEmail())
                .nickname(user.getNickname())
                .build();
    }
}
