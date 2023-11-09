package com.ssafy.petdio.controller;

import com.ssafy.petdio.service.ManagerService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

@RestController
@RequiredArgsConstructor
@Slf4j
@RequestMapping("/manager")
public class ManagerController {
    private final ManagerService managerService;

    @PostMapping("/concept/img")
    public ResponseEntity conceptPutImg(@RequestParam("imageFile") MultipartFile file, @RequestParam("conceptId") Long conceptId) {
        log.info(" concept put img!!! ");
        try {
            managerService.putConceptImg(conceptId, file);
            return ResponseEntity.status(HttpStatus.CREATED).build();
        } catch (Exception e) {
            log.error(e.getMessage());
            return ResponseEntity.status(HttpStatus.CONFLICT).body(e.getMessage());
        }
    }

    @PostMapping("/concept/example")
    public ResponseEntity examplePutImg(@RequestParam("imageFile") MultipartFile file, @RequestParam("conceptId") Long conceptId) {
        log.info(" example put img!!! ");
        try {
            managerService.putExamplesImg(conceptId, file);
            return ResponseEntity.status(HttpStatus.CREATED).build();
        } catch (Exception e) {
            log.error(e.getMessage());
            return ResponseEntity.status(HttpStatus.CONFLICT).body(e.getMessage());
        }
    }
}
