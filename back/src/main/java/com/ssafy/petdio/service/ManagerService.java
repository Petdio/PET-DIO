package com.ssafy.petdio.service;

import com.ssafy.petdio.model.entity.Concept;
import com.ssafy.petdio.model.entity.Examples;
import com.ssafy.petdio.repository.ConceptRepository;
import com.ssafy.petdio.repository.ExamplesRepository;
import jakarta.transaction.Transactional;
import java.io.IOException;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

@Service
@RequiredArgsConstructor
@Slf4j
public class ManagerService {
    private final FileService fileService;
    private final ConceptRepository conceptRepository;
    private final ExamplesRepository examplesRepository;

    @Transactional
    public void putConceptImg(Long conceptId, MultipartFile multipartFile) throws IOException {
        String url = fileService.uploadForMultipartFile(multipartFile);
        log.info("url = " + url);
//        conceptRepository.findByConceptDeleteAndConceptId(conceptId).updateConceptImg(url);
    }

    @Transactional
    public void putExamplesImg(Long conceptId, MultipartFile multipartFile) throws IOException {
        String url = fileService.uploadForMultipartFile(multipartFile);
        log.info("url = " + url);
//        examplesRepository.save(Examples.builder()
//                .concept(Concept.builder().conceptId(conceptId).build())
//                .imgURL(url)
//                .build());
    }

}
