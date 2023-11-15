package com.ssafy.petdio.service;

import com.ssafy.petdio.model.dto.ModelDto;
import com.ssafy.petdio.model.entity.Model;
import com.ssafy.petdio.repository.ModelRepository;
import com.ssafy.petdio.user.model.entity.User;
import com.ssafy.petdio.util.Leonardo;
import java.util.stream.Collectors;
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
    public void trainModel(String datasetName, List<MultipartFile> multipartFiles, String breed, Long userId) throws IOException {
        // 모델 트레이닝 변수 설정
        String datasetId = leonardo.createDataset(datasetName);
        leonardo.dataSetInit(datasetId, multipartFiles);
        StringBuilder sb = new StringBuilder();
        sb.append(datasetName);
        sb.append(userId.toString());
        String instancePrompt = sb.toString();
        // 모델 트레이닝
        String customModelId = leonardo.trainModel(datasetName, datasetId, instancePrompt);
        
        // DB에 저장할 때는 고양이인지 강아지인지까지 저장
        sb.append(" ");
        sb.append(breed);

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

    @Override
    public List<ModelDto.Response> getModelList(Long userId) {
        return modelRepository.findByUserUserId(userId).stream().map(model ->
                ModelDto.Response.builder()
                        .modelId(model.getModelId())
                        .modelName(model.getModelName())
                        .build())
                .collect(Collectors.toList());
    }

}
