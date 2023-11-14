package com.ssafy.petdio.service;

import org.springframework.web.multipart.MultipartFile;

public interface ModelService {

    String makeDataset(String datasetName, MultipartFile multipartFile, Long userId);

    String trainModel(String modelName, String datasetId, String instancePrompt);

}
