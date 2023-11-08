package com.ssafy.petdio.service;

import com.ssafy.petdio.model.Enum.Prompt;
import com.ssafy.petdio.model.dto.AiDto;
import com.ssafy.petdio.model.dto.FcmDto.NotificationMessage;
import com.ssafy.petdio.model.entity.Album;
import com.ssafy.petdio.model.entity.Concept;
import com.ssafy.petdio.model.entity.Setting;
import com.ssafy.petdio.repository.AlbumRepository;
import com.ssafy.petdio.repository.SettingRepository;
import com.ssafy.petdio.user.model.entity.User;
import com.ssafy.petdio.user.repository.UserRepository;
import com.ssafy.petdio.user.service.UserService;
import com.ssafy.petdio.util.Leonardo;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
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
    private final UserRepository userRepository;
    private final UserService userService;
    private final FcmService fcmService;
    private final RedisTemplate<String, AiDto.Data> redisTemplate;

    @Override
    public void makeAiImage(Long conceptId, MultipartFile multipartFile, String breed, Long userId) throws IOException {
        List<Setting> settings = settingRepository.findAllByConcept_ConceptId(conceptId);

        String selectedModelId = getRandomModelId();
        String generationId = leonardo.generateAndFetchImages(leonardo.putJsonPayload(settings, Prompt.findEnumById(conceptId), leonardo.init(multipartFile), breed, selectedModelId));


        //String generationId = leonardo.generateAndFetchImages(leonardo.putJsonPayload(settings, Prompt.findEnumById(conceptId), leonardo.init(multipartFile), breed));
        redisTemplate.opsForValue().set(generationId, AiDto.Data.builder().userId(userId).conceptId(conceptId).build());
    }

    @Override
    public void getImage(String leonardoUrl) throws Exception {
        String generationId = getGenerationId(leonardoUrl);
        AiDto.Data imageData = redisTemplate.opsForValue().get(generationId);
        log.info("redis 에서 꺼낸 값 : " + imageData);
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
        log.info("만들어진 url 링크: " + defaultUrl + s3Url);
        log.info("---------------fcm test------------");
        User user = userRepository.findByUserIdAndUserDeleteIsNull(imageData.getUserId()).orElseThrow();
        Map<String, String> map = new HashMap<>();
        map.put("test", "test11");
        if (user.getFcmToken() == null) throw new Exception("fcm 토큰 없음");
        fcmService.sendMessageTo(NotificationMessage.builder()
                        .title("사진 만들기 완료")
                        .image(defaultUrl + s3Url)
                        .body("확인해주세요!")
                        .recipientToken(user.getFcmToken())
                        .data(map)
                        .build());
        userService.useCoin(user.getUserId());
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

    private String getRandomModelId() {

        String[] modelIds = {
                "e316348f-7773-490e-adcd-46757c738eb7",
                "ac614f96-1082-45bf-be9d-757f2d31c174",
                "1e60896f-3c26-4296-8ecc-53e2afecc132",
                "5c232a9e-9061-4777-980a-ddc8e65647c6",
                "2067ae52-33fd-4a82-bb92-c2c55e7d2786",
                "d69c8273-6b17-4a30-a13e-d6637ae1c644",
                "f1929ea3-b169-4c18-a16c-5d58b4292c69",
                "1aa0f478-51be-4efd-94e8-76bfc8f533af"
        };

        Random random = new Random();
        int randomIndex = random.nextInt(modelIds.length);
        return modelIds[randomIndex];
    }
}
