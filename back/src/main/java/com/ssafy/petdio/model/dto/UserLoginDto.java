package com.ssafy.petdio.model.dto;

import lombok.Builder;
import lombok.Data;

@Data
public class UserLoginDto {

    private UserDto userDto;
    private String accessToken;

    @Builder
    public UserLoginDto(UserDto userDto, String accessToken){
        this.userDto = userDto;
        this.accessToken = accessToken;
    }

}
