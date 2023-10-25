package com.ssafy.petdio.controller;

import com.ssafy.petdio.model.dto.UserResponseDto;
import com.ssafy.petdio.repository.UserRepository;
import com.ssafy.petdio.service.UserService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@Slf4j
@RestController
@RequestMapping("/user")
@RequiredArgsConstructor
public class UserController {
    private final UserRepository userRepository;

    private final UserService userService;

    @GetMapping({"", "/{userId}"})
    public ResponseEntity<UserResponseDto> findMember(@PathVariable(required = false) Long userId) {
        return new ResponseEntity<>(userService.getUserProfile(userId), HttpStatus.OK);
    }

}
