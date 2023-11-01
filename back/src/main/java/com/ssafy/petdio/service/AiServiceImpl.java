package com.ssafy.petdio.service;

import com.ssafy.petdio.model.Enum.Prompt;
import com.ssafy.petdio.model.entity.Album;
import com.ssafy.petdio.model.entity.Concept;
import com.ssafy.petdio.model.entity.Setting;
import com.ssafy.petdio.model.entity.User;
import com.ssafy.petdio.repository.AlbumRepository2;
import com.ssafy.petdio.repository.SettingRepository;
import com.ssafy.petdio.util.Leonardo;
import java.io.IOException;
import java.util.List;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

@Service
@RequiredArgsConstructor
@Slf4j
public class AiServiceImpl implements AiService {

    @Value("${cloud.aws.url}")
    private String defaultUrl;

    private final SettingRepository settingRepository;
    private final Leonardo leonardo;
    private final FileService fileService;
    private final AlbumRepository2 albumRepository2;

    @Override
    public String makeAiImage(Long conceptId, MultipartFile multipartFile, Long userId) throws IOException {
        List<Setting> settings = settingRepository.findAllByConcept_ConceptId(conceptId);
        System.out.println(settings);

        String url = leonardo.generateAndFetchImages(leonardo.putJsonPayload(settings, Prompt.findEnumById(conceptId), leonardo.init(multipartFile)));
        if (url == null) return null;
        url = fileService.upload(url);
        albumRepository2.save(
                Album.builder()
                        .albumImgUrl(url)
                        .concept(Concept
                                .builder()
                                .conceptId(conceptId)
                                .build())
                        .user(User.builder()
                                .userId(userId)
                                .build())
                        .build());
        return defaultUrl + url;
    }



}
