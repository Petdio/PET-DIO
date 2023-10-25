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

//        String prompt = "Your image description here";
        String imagePath = "C:\\Users\\SSAFY\\Desktop\\dog.jpg";

        try {
            leonardo.initImage(prompt, imagePath);
        } catch (IOException e) {
            e.printStackTrace();
        }
        return "Hello Leonardo";
    }

    //이미지 url 안나왔을때 쓰는 api
    @GetMapping("/get/{id}")
    public String getImage(@PathVariable("id") String id) throws IOException{
        log.info("Leonardo get image");
        leonardo.getImage(id);
        return "success";
    }

    @GetMapping("/init")
    public String getImage() throws IOException{
        log.info("이미지 올리기");
        String path = "C:\\Users\\SSAFY\\Desktop\\dog.jpg";
        leonardo.init(path);
        return "success";
    }
}
