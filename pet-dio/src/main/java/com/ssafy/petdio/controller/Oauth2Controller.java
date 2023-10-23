package com.ssafy.petdio.controller;

import com.ssafy.petdio.service.Oauth2Service;
import com.ssafy.petdio.service.UserService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@Slf4j
@RestController
@RequestMapping("/oauth2")
@RequiredArgsConstructor
public class Oauth2Controller {
    private final KakaoService kakaoService;
    private final GoogleService googleService;

    @PostMapping("/login/kakao")
    public ResponseEntity<MemberLoginDto> kakaoLogin(@RequestBody OAuthReqDto oAuthReqDto) {
        KakaoTokenDto kakaoTokenDto = kakaoService.getKakaoAccessToken(oAuthReqDto.getCode());
        KakaoUserDto kakaoUserDto = kakaoService.getKakaoUser(kakaoTokenDto.getAccessToken());
        Member loginMember = kakaoService.loginKakao(kakaoUserDto);
        return new ResponseEntity<>(kakaoService.getMemberLoginDto(loginMember), HttpStatus.OK);
    }

    @PostMapping("/login/google")
    public ResponseEntity<MemberLoginDto> googleLogin(@RequestBody OAuthReqDto oAuthReqDto) {
        GoogleTokenDto googleTokenDto = googleService.getGoogleAccessToken(oAuthReqDto.getCode());
        GoogleUserDto googleUserDto = googleService.getGoogleUser(googleTokenDto.getAccessToken());
        Member loginMember = googleService.loginGoogle(googleUserDto);
        return new ResponseEntity<>(kakaoService.getMemberLoginDto(loginMember), HttpStatus.OK);
    }
}
