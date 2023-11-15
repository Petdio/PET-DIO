package com.ssafy.petdio.service;

import com.ssafy.petdio.model.dto.ModelDto;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.List;

public interface ModelService {

    void trainModel(String datasetName, List<MultipartFile> multipartFiles, String breed, Long userId) throws IOException;

    List<ModelDto.Response> getModelList(Long userId);
}
