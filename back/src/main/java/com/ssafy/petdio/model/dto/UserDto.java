package com.ssafy.petdio.model.dto;

import lombok.*;

@Data
@NoArgsConstructor
public class UserDto {

    private Long id;
    private String nickname;

    public UserDto(Long id, String nickname) {
        this.id = id;
        this.nickname = nickname;
    }
}
