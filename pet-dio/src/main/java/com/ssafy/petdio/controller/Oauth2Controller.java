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
@RequestMapping("/kakao")
@RequiredArgsConstructor
public class Oauth2Controller {
    private final Oauth2Service oauth2Service;
    private final UserService userService;

    @GetMapping("/login")
    public ResponseEntity kakaoLogin(@RequestParam("code") String code) {
        return ResponseEntity.status(HttpStatus.OK).body(oauth2Service.kakaoLogin(code));
    }

    @GetMapping("/logout")
    public ResponseEntity kakaoLogout(@RequestParam("state") String userId) {
        userService.logout(Long.valueOf(userId));
        return ResponseEntity.status(HttpStatus.ACCEPTED).build();
    }
}
