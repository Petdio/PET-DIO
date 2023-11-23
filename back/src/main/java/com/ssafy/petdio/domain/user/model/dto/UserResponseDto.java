package com.ssafy.petdio.domain.user.model.dto;

import com.ssafy.petdio.domain.user.model.entity.User;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class UserResponseDto {

    private String nickname;
    private String email;
    private int coin;

    public UserResponseDto toUserResponseDto(User user) {
        return UserResponseDto.builder()
                .nickname(user.getUserNickname())
                .email(user.getUserEmail())
                .coin(user.getUserCoin())
                .build();
    }
}
