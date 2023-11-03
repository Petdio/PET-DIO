package com.ssafy.petdio.user.model.dto;

import com.ssafy.petdio.model.Enum.Role;
import lombok.*;

@Data
@NoArgsConstructor
@ToString
public class UserDto {

    private Long userId;
    private String userNickname;
    private String profileImage;
    private int userCoin;
    private Role role;

    public UserDto(Long userId, String userNickname, String profileImage, int userCoin, Role role) {
        this.userId = userId;
        this.userNickname = userNickname;
        this.profileImage = profileImage;
        this.userCoin = userCoin;
        this.role = role;
    }
}
