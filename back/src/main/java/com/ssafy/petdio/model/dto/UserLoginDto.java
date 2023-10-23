package com.ssafy.petdio.model.dto;

import lombok.Builder;
import lombok.Data;

@Data
public class UserLoginDto {

    private UserDto userDTO;
    private String accessToken;

    @Builder
    public UserLoginDto(UserDto userDto, String accessToken){
        this.userDTO = userDto;
        this.accessToken = accessToken;
    }

}
