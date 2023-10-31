package com.ssafy.petdio.controller;

import com.ssafy.petdio.service.AiService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

@RestController
@RequiredArgsConstructor
@Slf4j
@RequestMapping("/ai")
public class AiController {

    private final AiService aiService;

    @PostMapping("/create")
    public ResponseEntity createImages(@RequestParam("conceptId") Long conceptId, @RequestParam("imageFile") MultipartFile imageFile){
        log.info("hello createImages");
        System.out.println("1231231231213dsfdsfdsfsdfsdsdsssxfdsv2");
        try {
            String url = aiService.makeAiImage(conceptId, imageFile);
            if (url == null) {
                log.info("ai 사진 만들기 실패");
                return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
            }
            log.info("ai사진 만들기 성공 url : " + url);
            return ResponseEntity.status(HttpStatus.OK).body(url);
        } catch (Exception e){
            log.error("ai 사진 만들기 에러");
            return ResponseEntity.status(HttpStatus.CONFLICT).build();
        }
    }
}
