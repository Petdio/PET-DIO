package com.ssafy.petdio.controller;

import com.ssafy.petdio.service.Oauth2Service;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@Slf4j
@RestController
@RequestMapping("/login")
@RequiredArgsConstructor
public class Oauth2Controller {
    private final Oauth2Service oauth2Service;

    @GetMapping("/kakao")
    public ResponseEntity kakaoLogin(@RequestParam("code") String code) {
        return ResponseEntity.status(HttpStatus.OK).body(oauth2Service.kakaoLogin(code));
    }
}
