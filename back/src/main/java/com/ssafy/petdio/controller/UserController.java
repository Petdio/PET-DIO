package com.ssafy.petdio.controller;

import com.ssafy.petdio.model.dto.UserDto;
import com.ssafy.petdio.repository.UserRepository;
import com.ssafy.petdio.service.UserService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

@Slf4j
@RestController
@RequestMapping("/user")
@RequiredArgsConstructor
@CrossOrigin(origins = "http://localhost:3000")
public class UserController {
    private final UserRepository userRepository;

    private final UserService userService;

    @GetMapping({""})
    public ResponseEntity<UserDto> findMember(Authentication authentication) {
        return new ResponseEntity<>(userService.getUserProfile(null, Long.parseLong(authentication.getName())), HttpStatus.OK);
    }

}
