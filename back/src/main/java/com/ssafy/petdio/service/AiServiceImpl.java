package com.ssafy.petdio.service;

import com.ssafy.petdio.model.Enum.Prompt;
import com.ssafy.petdio.model.dto.AiDto;
import com.ssafy.petdio.model.entity.Album;
import com.ssafy.petdio.model.entity.Concept;
import com.ssafy.petdio.model.entity.Setting;
import com.ssafy.petdio.model.entity.User;
import com.ssafy.petdio.repository.AlbumRepository;
import com.ssafy.petdio.repository.SettingRepository;
import com.ssafy.petdio.util.Leonardo;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.List;
import java.util.Random;
import java.util.regex.Matcher;
import java.util.regex.Pattern;
@Service
@RequiredArgsConstructor
@Slf4j
public class AiServiceImpl implements AiService {

    @Value("${cloud.aws.url}")
    private String defaultUrl;

    private final SettingRepository settingRepository;
    private final Leonardo leonardo;
    private final FileService fileService;
    private final AlbumRepository albumRepository;
    private final RedisTemplate<String, AiDto.Data> redisTemplate;

    @Override
    public void makeAiImage(Long conceptId, MultipartFile multipartFile, String breed, Long userId) throws IOException {
        List<Setting> settings = settingRepository.findAllByConcept_ConceptId(conceptId);
        String generationId = null;


        if (conceptId == 1) {
            String[] modelIds = {"modelId1_concept1", "modelId2_concept1", "modelId3_concept1"};
            String selectedModelId = getRandomModelId(modelIds);
            generationId = leonardo.generateAndFetchImages(leonardo.putJsonPayload(settings, Prompt.findEnumById(conceptId), leonardo.init(multipartFile), breed, selectedModelId));
        } else if (conceptId == 2) {
            String[] modelIds = {"modelId1_concept2", "modelId2_concept2", "modelId3_concept2"};
            String selectedModelId = getRandomModelId(modelIds);
            generationId = leonardo.generateAndFetchImages(leonardo.putJsonPayload(settings, Prompt.findEnumById(conceptId), leonardo.init(multipartFile), breed, selectedModelId));
        }

        //String generationId = leonardo.generateAndFetchImages(leonardo.putJsonPayload(settings, Prompt.findEnumById(conceptId), leonardo.init(multipartFile), breed));
        redisTemplate.opsForValue().set(generationId, AiDto.Data.builder().userId(userId).conceptId(conceptId).build());
    }

    @Override
    public String getImage(String leonardoUrl) throws Exception {
        String generationId = getGenerationId(leonardoUrl);
        AiDto.Data imageData = redisTemplate.opsForValue().get(generationId);

//        String s3Url = leonardo.getImageByGenerationId(generationId);
//        if (s3Url == null) return null;
        String s3Url = fileService.upload(leonardoUrl);
        albumRepository.save(
                Album.builder()
                        .albumImgUrl(s3Url)
                        .concept(Concept
                                .builder()
                                .conceptId(imageData.getConceptId())
                                .build())
                        .user(User.builder()
                                .userId(imageData.getUserId())
                                .build())
                        .build());
        return defaultUrl + s3Url;
    }

    private String getGenerationId(String leonardoUrl) throws Exception {
        String pattern = "/([^/]+)/[^/]+$";

        Pattern r = Pattern.compile(pattern);
        Matcher m = r.matcher(leonardoUrl);

        if (m.find()) {
            String generationId = m.group(1);
            log.info("generationId : " + generationId);
            return generationId;
        } else {
            log.error("GenerationId를 찾을 수 없음! leonardoUrl : " + leonardoUrl);
            throw new Exception("url 에서 GenerationId 찾을 수 없음");
        }
    }

    private String getRandomModelId(String[] modelIds) {
        Random random = new Random();
        int randomIndex = random.nextInt(modelIds.length);
        return modelIds[randomIndex];
    }
}
