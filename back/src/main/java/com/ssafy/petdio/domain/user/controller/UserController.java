package com.ssafy.petdio.domain.user.controller;

import com.ssafy.petdio.domain.user.repository.UserRepository;
import com.ssafy.petdio.domain.user.model.dto.FcmDto;
import com.ssafy.petdio.domain.user.model.dto.UserDto;
import com.ssafy.petdio.domain.user.service.UserService;
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

    @PostMapping("/fcm")
    public ResponseEntity fcmTokenUpdate(@RequestBody FcmDto fcmDto, Authentication authentication) {
        log.info("전달받은 fcmToken: " + fcmDto.getFcmToken());
        Long userId = Long.valueOf(authentication.getName());
        userService.updateFcmToken(userId, fcmDto.getFcmToken());
        return ResponseEntity.status(HttpStatus.OK).build();
    }

}
