package com.ssafy.petdio.controller;

import com.ssafy.petdio.service.AiService;
import com.ssafy.petdio.service.ConceptService;
import java.io.IOException;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

@RestController
@RequiredArgsConstructor
@Slf4j
@RequestMapping("/concept")
public class ConceptController {
    private final ConceptService conceptService;
    private final AiService aiService;

    @GetMapping("/health-check")
    public String getHealth() {
        log.info("health-check manager-service");
        return "Hello Concept-Service";
    }

    @GetMapping("/list")
    public ResponseEntity getConceptList() {
        log.info("get concept list");
        return ResponseEntity.status(HttpStatus.OK).body(conceptService.getConceptList());
    }

    @PostMapping("/image")
    public String makeAiImage(@RequestParam(value = "file", required = false) MultipartFile file, @RequestParam(value = "conceptId") Long conceptId, Authentication authentication) {
        log.info("make Ai Image");
        System.out.println("userId: " + Long.parseLong(authentication.getName()));
        try {
            aiService.makeAiImage(conceptId, file);
        } catch (IOException e) {
            throw new RuntimeException(e);
        }
        return "Hello Concept-Service";
    }
}
