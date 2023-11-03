package com.ssafy.petdio.user.model.dto;

import lombok.Builder;
import lombok.Data;
import lombok.ToString;

@Data
@ToString
public class UserLoginDto {

    private UserDto userDto;
    private String accessToken;

    @Builder
    public UserLoginDto(UserDto userDto, String accessToken){
        this.userDto = userDto;
        this.accessToken = accessToken;
    }

}
