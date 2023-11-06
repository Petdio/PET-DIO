package com.ssafy.petdio.controller;

import com.ssafy.petdio.model.dto.FcmDto.NotificationMessage;
import com.ssafy.petdio.service.AiService;
import java.util.Arrays;

import com.ssafy.petdio.service.FcmService;
import java.util.HashMap;
import java.util.Map;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

@RestController
@RequiredArgsConstructor
@Slf4j
@CrossOrigin(origins = "http://localhost:3000")
@RequestMapping("/ai")
public class AiController {
    private final AiService aiService;
    private final FcmService fcmService;

    @PostMapping("/create")
    public ResponseEntity createImages(@RequestParam("conceptId") Long conceptId,
                                       @RequestParam("imageFile") MultipartFile imageFile,
                                       @RequestParam("breed") String breed, Authentication authentication){
        log.info("hello createImages");
        try {
            Long userId = Long.valueOf(authentication.getName());
            aiService.makeAiImage(conceptId, imageFile, breed, userId);
            log.info("ai사진 만들기 요청 성공 url!!");
            return ResponseEntity.status(HttpStatus.OK).build();
        } catch (Exception e){
            log.error("ai 사진 만들기 에러"+e.getMessage());
            return ResponseEntity.status(HttpStatus.CONFLICT).build();
        }
    }

    @PostMapping("/webhook")
    public void webhookAlarm(@RequestBody String url) {
        log.info("webhook!!! " + url);
        try {
            aiService.getImage(url);
        } catch (Exception e) {
            log.error("ai 사진 만든 후 에러"+e.getMessage());
        }
    }
}
