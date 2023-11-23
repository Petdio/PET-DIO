package com.ssafy.petdio.domain.auth.jwt.controller;

import com.ssafy.petdio.domain.auth.jwt.service.JwtService;
import com.ssafy.petdio.domain.auth.jwt.mapper.JwtMapper;
import com.ssafy.petdio.domain.user.model.dto.UserDto;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequiredArgsConstructor
@RequestMapping("jwt")
public class JwtController {

    private final JwtService jwtService;

    @PostMapping("/access-token-test")
    public String accessTokenTest(@RequestBody UserDto userDto) {
        System.out.println(userDto.toString());
        return jwtService.createAccessToken(JwtMapper.INSTANCE.userDtoToJwtDto(userDto));
    }
}