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
            log.info("---------------fcm test------------");
            Map<String, String> map = new HashMap<>();
            map.put("test", "test11");
            fcmService.sendMessageTo(userId, NotificationMessage.builder().title("12").image("1234").body("123").recipientToken("cSSKYNg6UT4Kkda3HLmLwy:APA91bH5tbpVYGMSpmHL9DNtZm0aEWe1vspMmbYaD7Xi1CVncPcO4by8LWz4MHC0QRSmxl_J_a2Vd1KxcIOahLQTorIA82A-oNevVAUkUhIu7bgeV2qLKBM3xzVhJQshfCnnyg7r-hmL").data(map).build());
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
            log.info("결과!!!: " + aiService.getImage(url));
//            return ResponseEntity.status(HttpStatus.OK).bo;
        } catch (Exception e) {
            throw new RuntimeException(e);
        }
//        return ResponseEntity.status(HttpStatus.OK).build();
    }

}
