package com.ssafy.petdio.controller;

import com.ssafy.petdio.service.AiService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

@RestController
@RequiredArgsConstructor
@Slf4j
@RequestMapping("/ai")
public class AiController {

    private final AiService aiService;

    @PostMapping("/create/{conceptId}")
    public String createImages(@PathVariable("conceptId") Long conceptId, @RequestParam("imageFile") MultipartFile imageFile){
        try{

            aiService.makeAiImage(conceptId, imageFile);

            String bucket = "${bucket}";
            String key = "${cloud.aws.credentials.S3secretKey}";

            aiService.S3ImageUpload(bucket,key,imageFile);

            return "aiService.makeAiImage Success";

        } catch (Exception e){
            return "makeAiImage Exception" + e.getMessage();
        }
    }
}
