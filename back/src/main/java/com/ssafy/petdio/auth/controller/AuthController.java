package com.ssafy.petdio.auth.controller;

import com.ssafy.petdio.auth.oauth2.common.OAuthReqDto;
import com.ssafy.petdio.auth.oauth2.kakao.KakaoService;
import com.ssafy.petdio.auth.oauth2.kakao.KakaoTokenDto;
import com.ssafy.petdio.auth.oauth2.kakao.KakaoUserDto;
import com.ssafy.petdio.model.dto.UserLoginDto;
import com.ssafy.petdio.model.entity.User;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@Slf4j
@RestController
@RequestMapping("/oauth2")
@RequiredArgsConstructor
public class AuthController {
    private final KakaoService kakaoService;

    @GetMapping("/login/kakao")
    public ResponseEntity<UserLoginDto> kakaoLogin(@RequestParam("code") String code) {
        KakaoTokenDto kakaoTokenDto = kakaoService.getKakaoAccessToken(code);
        KakaoUserDto kakaoUserDto = kakaoService.getKakaoUser(kakaoTokenDto.getAccessToken());
        User loginUser = kakaoService.loginKakao(kakaoUserDto);
        return new ResponseEntity<>(kakaoService.getUserLoginDto(loginUser), HttpStatus.OK);
    }

}
