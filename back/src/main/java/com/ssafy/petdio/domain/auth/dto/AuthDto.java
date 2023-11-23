package com.ssafy.petdio.domain.auth.dto;

import com.ssafy.petdio.domain.user.model.entity.User;
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
