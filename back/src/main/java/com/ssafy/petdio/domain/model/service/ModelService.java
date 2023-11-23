package com.ssafy.petdio.domain.model.service;

import com.ssafy.petdio.domain.model.dto.ModelDto;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.List;

public interface ModelService {

    String trainModel(String datasetName, List<MultipartFile> multipartFiles, String breed, Long userId) throws IOException;

    List<ModelDto.Response> getModelList(Long userId);
}
