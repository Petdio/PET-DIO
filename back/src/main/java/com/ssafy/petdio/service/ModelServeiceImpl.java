package com.ssafy.petdio.service;

import com.ssafy.petdio.model.entity.Model;
import com.ssafy.petdio.repository.ModelRepository;
import com.ssafy.petdio.user.model.entity.User;
import com.ssafy.petdio.util.Leonardo;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.List;

@Service
@RequiredArgsConstructor
@Slf4j
public class ModelServeiceImpl implements ModelService{

    private final Leonardo leonardo;
    private final ModelRepository modelRepository;

    @Override
    public void trainModel(String datasetName, List<MultipartFile> multipartFiles, Long userId) throws IOException {

        String datasetId = leonardo.createDataset(datasetName);
        leonardo.dataSetInit(datasetId, multipartFiles);
        StringBuilder sb = new StringBuilder();
        sb.append(datasetName);
        sb.append(userId.toString());
        String instancePrompt = sb.toString();
        String customModelId = leonardo.trainModel(datasetName, datasetId, instancePrompt);

        modelRepository.save(
                Model.builder()
                        .modelName(datasetName)
                        .datasetId(datasetId)
                        .instancePrompt(instancePrompt)
                        .customModelId(customModelId)
                        .user(User.builder().userId(userId).build())
                        .build()
        );

    }

}
