package com.ssafy.petdio.controller;

import com.ssafy.petdio.model.dto.FcmDto.NotificationMessage;
import com.ssafy.petdio.service.AiService;
import com.ssafy.petdio.service.SseService;
import jakarta.servlet.http.HttpServletResponse;
import java.time.Duration;
import java.time.LocalTime;
import java.util.Arrays;

import com.ssafy.petdio.service.FcmService;
import java.util.HashMap;
import java.util.Map;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.context.ApplicationContext;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.servlet.mvc.method.annotation.SseEmitter;
import org.yaml.snakeyaml.emitter.Emitter;
import reactor.core.publisher.Flux;

@RestController
@RequiredArgsConstructor
@Slf4j
@CrossOrigin(origins = "http://localhost:3000")
@RequestMapping("/ai")
public class AiController {
    private ApplicationContext appContext;
    private final AiService aiService;
    private final FcmService fcmService;
    private final SseService sseService;

    @PostMapping("/create")
    public ResponseEntity createImages(@RequestParam("conceptId") Long conceptId,
                                       @RequestParam("imageFile") MultipartFile imageFile,
                                       @RequestParam("breed") String breed, Authentication authentication){
        log.info("hello createImages");
        try {
            Long userId = Long.valueOf(authentication.getName());
//            aiService.makeAiImage(conceptId, imageFile, breed, userId);
            return ResponseEntity.status(HttpStatus.OK).body(aiService.makeAiImage(conceptId, imageFile, breed, userId));
        } catch (Exception e){
            log.error("ai 사진 만들기 에러"+e.getMessage());
            return ResponseEntity.status(HttpStatus.CONFLICT).build();
        }
    }

    @PostMapping("/webhook")
    public void webhookAlarm(@RequestBody String url) {
        log.info("webhook!!! " + url);
        try {
            aiService.webhookUrlCheck(url);
//            aiService.getImage(url);
            log.info("ai fcm 성공");
        } catch (Exception e) {
            log.error("ai 사진 만든 후 에러"+e.getMessage());
        }
    }

    @GetMapping("/sse") //발행
    public SseEmitter streamDateTime(@RequestParam("generationId") String generationId, HttpServletResponse response) {
        log.info("sse : " + generationId);
        response.setHeader("Access-Control-Allow-Origin", "*");
        response.setHeader("Access-Control-Allow-Methods", "GET, OPTIONS");
        response.setHeader("Access-Control-Allow-Headers", "Origin, Content-Type, Accept");
        return sseService.connectNotification(generationId);
    }

//    @GetMapping(value = "/stream-sse", produces = "text/event-stream")
//    public Flux<String> streamEvents() {
//        return Flux.interval(Duration.ofSeconds(1))
//                .map(sequence -> "SSE Event - " + LocalTime.now().toString());
//    }
}
