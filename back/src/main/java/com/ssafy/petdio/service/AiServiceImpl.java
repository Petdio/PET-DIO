package com.ssafy.petdio.service;

import com.amazonaws.services.s3.AmazonS3;
import com.amazonaws.services.s3.model.ObjectMetadata;
import com.ssafy.petdio.model.Enum.Prompt;
import com.ssafy.petdio.model.entity.Setting;
import com.ssafy.petdio.repository.SettingRepository;
import com.ssafy.petdio.util.Leonardo;
import java.io.IOException;
import java.io.InputStream;
import java.util.List;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.json.JSONObject;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

@Service
@RequiredArgsConstructor
@Slf4j
public class AiServiceImpl implements AiService {

    private final SettingRepository settingRepository;
    private final Leonardo leonardo;
    private final AmazonS3 amazonS3;

    @Override
    public void makeAiImage(Long conceptId, MultipartFile multipartFile) throws IOException {
        List<Setting> settings = settingRepository.findAllByConcept_ConceptId(conceptId);
        System.out.println(settings);

        leonardo.generateAndFetchImages(leonardo.putJsonPayload(settings, Prompt.findEnumById(conceptId), leonardo.init(multipartFile)));
    }

    @Override
    public void S3ImageUpload(String bucket, String key, MultipartFile image) throws IOException {

        ObjectMetadata metadata = new ObjectMetadata();
        metadata.setContentLength(image.getSize());
        metadata.setContentType(image.getContentType());

        try(InputStream inputStream = image.getInputStream()){
            amazonS3.putObject(bucket, key, inputStream, metadata);
        }
    }
}
