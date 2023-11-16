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
                                        @RequestParam("files") List<MultipartFile> files,
                                        @RequestParam("breed") String breed,
                                        Authentication authentication)
    {
        try {
            log.info("트레이닝 요청 성공했어요!");
            log.info(files.toString());
//            modelService.trainModel(datasetName, files, breed, Long.valueOf(authentication.getName()));
            return ResponseEntity.status(HttpStatus.OK).body(null);
        } catch (Exception e) {
            log.error("모델 만들기 에러"+e.getMessage());
            return ResponseEntity.status(HttpStatus.CONFLICT).build();
        }

    }

    @GetMapping("/list")
    public ResponseEntity getModelList(Authentication authentication)
    {
        try {
            log.info("모델 리스트 반환 !" + authentication.getName());
            return ResponseEntity.status(HttpStatus.OK).body(modelService.getModelList(
                    Long.valueOf(authentication.getName())));
        } catch (Exception e) {
            log.error("모델 리스트 반환 에러"+e.getMessage());
            return ResponseEntity.status(HttpStatus.CONFLICT).build();
        }
    }

}
