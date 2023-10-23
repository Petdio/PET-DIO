package com.ssafy.petdio.controller;

import com.ssafy.petdio.util.Leonardo;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.web.bind.annotation.*;

import java.io.IOException;

@Slf4j
@RestController
@RequestMapping("/ai")
@RequiredArgsConstructor
public class TestController {

    private final Leonardo leonardo;

    @GetMapping("/health-check")
    public String getHealth(@RequestParam("prompt") String prompt) throws IOException {
        log.info("Leonardo test");
        leonardo.test2(prompt);
        return "Hello Leonardo";
    }

    @GetMapping("/get/{id}")
    public String getImage(@PathVariable("id") String id) throws IOException{
        log.info("Leonardo get image");
        leonardo.getImage(id);
        return "success";
    }
}
