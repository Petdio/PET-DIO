package com.ssafy.petdio.controller;

import com.ssafy.petdio.model.entity.Model;
import com.ssafy.petdio.repository.ModelRepository;
import com.ssafy.petdio.service.ModelService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

@RestController
@RequiredArgsConstructor
@Slf4j
@CrossOrigin(origins = "http://localhost:3000")
@RequestMapping("/model")
public class ModelController {

    private final ModelService modelService;

    @PostMapping("/train")
    public ResponseEntity createDataset(@RequestParam("datasetName") String datasetName,
                                        @RequestParam(value = "files") List<MultipartFile> files,
                                        Authentication authentication)
    {
        try {
//            modelService.trainModel(datasetName, files, Long.valueOf(authentication.getName()));
            return ResponseEntity.status(HttpStatus.OK).body(null);
        } catch (Exception e) {
            log.error("모델 만들기 에러"+e.getMessage());
            return ResponseEntity.status(HttpStatus.CONFLICT).build();
        }

    }

}
