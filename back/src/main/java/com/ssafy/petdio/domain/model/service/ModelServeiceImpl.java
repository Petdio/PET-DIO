package com.ssafy.petdio.domain.model.service;

import com.ssafy.petdio.domain.ai.dto.AiDto;
import com.ssafy.petdio.domain.model.dto.ModelDto;
import com.ssafy.petdio.entity.Model;
import com.ssafy.petdio.domain.model.repository.ModelRepository;
import com.ssafy.petdio.domain.user.model.entity.User;
import com.ssafy.petdio.util.Leonardo;
import java.util.stream.Collectors;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.redis.core.RedisTemplate;
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

    private final RedisTemplate<String, AiDto.Data> redisTemplate;

    @Override
    public String trainModel(String datasetName, List<MultipartFile> multipartFiles, String breed, Long userId) throws IOException {
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

        instancePrompt = sb.toString();

        modelRepository.save(
                Model.builder()
                        .modelName(datasetName)
                        .datasetId(datasetId)
                        .instancePrompt(instancePrompt)
                        .success(false)
                        .customModelId(customModelId)
                        .user(User.builder().userId(userId).build())
                        .build()
        );

        //레디스 저장
        redisTemplate.opsForValue().set(datasetId,
                AiDto.Data.builder().userId(userId).conceptId(null).build());

        return datasetId;

    }

    @Override
    public List<ModelDto.Response> getModelList(Long userId) {
        return modelRepository.findByUserUserIdAndSuccessTrue(userId).stream().map(model ->
                ModelDto.Response.builder()
                        .modelId(model.getModelId())
                        .modelName(model.getModelName())
                        .build())
                .collect(Collectors.toList());
    }

}
