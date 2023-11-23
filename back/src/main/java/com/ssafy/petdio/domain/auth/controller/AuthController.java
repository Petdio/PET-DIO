package com.ssafy.petdio.domain.auth.controller;

import com.ssafy.petdio.domain.auth.dto.AuthDto;
import com.ssafy.petdio.domain.auth.oauth2.common.OAuthReqDto;
import com.ssafy.petdio.domain.auth.oauth2.kakao.KakaoService;
import com.ssafy.petdio.domain.auth.oauth2.kakao.KakaoTokenDto;
import com.ssafy.petdio.domain.auth.oauth2.kakao.KakaoUserDto;
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
    public ResponseEntity kakaoLogin(@RequestBody OAuthReqDto oAuthReqDto) {
        log.info("카카오 로그인");
        log.info("전달온 값: " + oAuthReqDto);
        KakaoTokenDto kakaoTokenDto = kakaoService.getKakaoAccessToken(oAuthReqDto.getCode());
        KakaoUserDto kakaoUserDto = kakaoService.getKakaoUser(kakaoTokenDto.getAccessToken());
        AuthDto loginUser = null;
        try {
            loginUser = kakaoService.loginKakao(kakaoUserDto);
            log.info("로그인한 유저: " + loginUser);
            return ResponseEntity.status(HttpStatus.ACCEPTED).body(kakaoService.getUserLoginDto(loginUser));
        } catch (Exception e) {
            log.error(e.getMessage());
            return ResponseEntity.status(HttpStatus.CONFLICT).body(e.getMessage());
        }
    }

}
