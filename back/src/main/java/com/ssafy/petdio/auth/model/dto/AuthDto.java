package com.ssafy.petdio.auth.model.dto;

import com.ssafy.petdio.model.Enum.Role;
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
public class AuthDto {
    private boolean newMember;
    private User user;
}
