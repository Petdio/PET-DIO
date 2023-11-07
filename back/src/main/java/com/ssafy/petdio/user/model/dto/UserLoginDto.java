package com.ssafy.petdio.user.model.dto;

import com.ssafy.petdio.auth.model.dto.AuthDto;
import lombok.Builder;
import lombok.Data;
import lombok.ToString;

@Data
@ToString
public class UserLoginDto {

    private boolean newMember;
    private String accessToken;

    @Builder
    public UserLoginDto(boolean newMember, String accessToken){
        this.newMember = newMember;
        this.accessToken = accessToken;
    }

}
