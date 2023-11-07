package com.ssafy.petdio.auth.model.dto;

import com.ssafy.petdio.model.Enum.Role;
import com.ssafy.petdio.model.Enum.SocialType;
import com.ssafy.petdio.user.model.entity.User;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.ToString;

@Getter
@ToString
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class LoginUser {
    private Long userId;
    private String userEmail;
    private int userCoin;
    private String userNickname;
    private String profileImage;
    private Role role;
    private boolean newMember;

    public LoginUser loginUser(User user, boolean newMember) {
        return LoginUser.builder()
                .userId(user.getUserId())
                .userEmail(user.getUserEmail())
                .userCoin(user.getUserCoin())
                .userNickname(user.getUserNickname())
                .profileImage(user.getProfileImage())
                .role(user.getRole())
                .newMember(newMember)
                .build();
    }
}
