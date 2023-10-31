package com.ssafy.petdio.model.dto;

import com.ssafy.petdio.model.entity.Role;
import lombok.*;

@Data
@NoArgsConstructor
@ToString
public class UserDto {

    private Long userId;
    private String userNickname;
    private String profileImage;
    private int coin;
    private Role role;

    public UserDto(Long userId, String userNickname, String profileImage, int coin, Role role) {
        this.userId = userId;
        this.userNickname = userNickname;
        this.profileImage = profileImage;
        this.coin = coin;
        this.role = role;
    }
}
