package com.ssafy.petdio.controller;

import com.ssafy.petdio.repository.UserRepository;
import com.ssafy.petdio.service.UserService;
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
@RequestMapping("/user")
@RequiredArgsConstructor
public class UserController {
    private final UserRepository userRepository;

    private final UserService userService;

    @GetMapping
    public ResponseEntity getUserProfile(Long id) {
        log.info("get user profile");
        return ResponseEntity.status(HttpStatus.OK).body(userService.getUserProfile(id));
    }

}
