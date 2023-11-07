package com.ssafy.petdio.user.model.dto;

import com.ssafy.petdio.auth.model.dto.AuthDto;
import lombok.Builder;
import lombok.Data;
import lombok.ToString;

@Data
@ToString
public class UserLoginDto {

    private AuthDto.LoginUser userDto;
    private String accessToken;

    @Builder
    public UserLoginDto(AuthDto.LoginUser userDto, String accessToken){
        this.userDto = userDto;
        this.accessToken = accessToken;
    }

}
