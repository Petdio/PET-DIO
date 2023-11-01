package com.ssafy.petdio.controller;

import com.ssafy.petdio.service.AiService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
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

    @PostMapping("/create")
    public ResponseEntity createImages(@RequestParam("conceptId") Long conceptId, @RequestParam("imageFile") MultipartFile imageFile, Authentication authentication){
        log.info("hello createImages");
        try {
            Long userId = Long.valueOf(authentication.getName());
            String url = aiService.makeAiImage(conceptId, imageFile, userId);
            if (url == null) {
                log.info("ai 사진 만들기 실패");
                return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
            }
            log.info("ai사진 만들기 성공 url : " + url);
            return ResponseEntity.status(HttpStatus.OK).body(url);
        } catch (Exception e){
            log.error("ai 사진 만들기 에러"+e.getMessage());
            return ResponseEntity.status(HttpStatus.CONFLICT).build();
        }
    }

    @PostMapping("/webhook")
    public ResponseEntity webhookAlarm(@RequestBody String payload) {
        log.info("webhook!!! " + payload);
        return ResponseEntity.status(HttpStatus.OK).build();
    }
}
