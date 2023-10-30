package com.ssafy.petdio.controller;

import com.ssafy.petdio.service.AiService;
import com.ssafy.petdio.service.ConceptService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

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

    @GetMapping("/health-check")
    public String makeAiImage() {
        log.info("make Ai Image");
        aiService.makeAiImage(Long.parseLong("2"));
        return "Hello Concept-Service";
    }
}
