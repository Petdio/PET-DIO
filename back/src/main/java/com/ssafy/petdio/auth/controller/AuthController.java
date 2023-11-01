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
@CrossOrigin(origins = "http://localhost:3000")
@RequestMapping("/oauth2")
@RequiredArgsConstructor
public class AuthController {
    private final KakaoService kakaoService;

    @PostMapping("/login/kakao")
    public ResponseEntity<UserLoginDto> kakaoLogin(@RequestBody OAuthReqDto oAuthReqDto) {
        log.info("카카오 로그인");
        KakaoTokenDto kakaoTokenDto = kakaoService.getKakaoAccessToken(oAuthReqDto.getCode());
        KakaoUserDto kakaoUserDto = kakaoService.getKakaoUser(kakaoTokenDto.getAccessToken());
        User loginUser = kakaoService.loginKakao(kakaoUserDto);
        System.out.println("loginUser : " + loginUser);
        return new ResponseEntity<>(kakaoService.getUserLoginDto(loginUser), HttpStatus.OK);
    }

}
