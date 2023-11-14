package com.ssafy.petdio.service;

import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.List;

public interface ModelService {

    void trainModel(String datasetName, List<MultipartFile> multipartFiles, Long userId) throws IOException;

}
