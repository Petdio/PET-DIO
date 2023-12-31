package com.ssafy.petdio.domain.ai.service;

import com.ssafy.petdio.entity.Enum.ConceptModel;
import com.ssafy.petdio.entity.Enum.Prompt;
import com.ssafy.petdio.entity.Enum.Coin;
import com.ssafy.petdio.domain.ai.dto.AiDto;
import com.ssafy.petdio.domain.alert.dto.FcmDto.NotificationMessage;
import com.ssafy.petdio.entity.Album;
import com.ssafy.petdio.entity.Concept;
import com.ssafy.petdio.entity.Model;
import com.ssafy.petdio.entity.Setting;
import com.ssafy.petdio.domain.album.repository.AlbumRepository;
import com.ssafy.petdio.domain.model.repository.ModelRepository;
import com.ssafy.petdio.domain.ai.repository.SettingRepository;
import com.ssafy.petdio.domain.alert.service.FcmService;
import com.ssafy.petdio.domain.alert.service.SseService;
import com.ssafy.petdio.domain.user.model.entity.User;
import com.ssafy.petdio.domain.user.repository.UserRepository;
import com.ssafy.petdio.domain.user.service.UserService;
import com.ssafy.petdio.util.Leonardo;
import com.ssafy.petdio.util.Lora;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.json.JSONObject;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
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
    private final Lora lora;
    private final FileService fileService;
    private final AlbumRepository albumRepository;
    private final UserRepository userRepository;
    private final UserService userService;
    private final FcmService fcmService;
    private final RedisTemplate<String, AiDto.Data> redisTemplate;
    private final SseService sseService;
    private final ModelRepository modelRepository;

    @Override
    public String makeAiImage(Long conceptId, MultipartFile multipartFile, String breed, Long userId) throws IOException {
        List<Setting> settings = settingRepository.findAllByConcept_ConceptId(conceptId);

        // 레오나르도
//        if (conceptId < 6) {

//        String selectedModelId = getRandomModelId();
            String selectedModelId = ConceptModel.findEnumById(conceptId).getModelId();
            String generationId = leonardo.generateAndFetchImages(
                    leonardo.putJsonPayload(settings, Prompt.findEnumById(conceptId),
                            leonardo.init(multipartFile), breed, selectedModelId));
            //String generationId = leonardo.generateAndFetchImages(leonardo.putJsonPayload(settings, Prompt.findEnumById(conceptId), leonardo.init(multipartFile), breed));
            redisTemplate.opsForValue().set(generationId,
                    AiDto.Data.builder().userId(userId).conceptId(conceptId).build());
            return generationId;
//            return sseService.connectNotification(generationId);
//        }

    }

    @Override
    public String makerealPhotoImage(Long conceptId, int modelId, Long userId) throws IOException {

        List<Setting> settings = settingRepository.findAllByConcept_ConceptId(conceptId);

        Model model = modelRepository.findByUserUserIdAndModelIdAndSuccessTrue(userId, modelId);

        String breed = model.getInstancePrompt();

        String generationId = leonardo.generateAndFetchImages(
                leonardo.realPhotoPutJsonPayload(settings, Prompt.findEnumById(conceptId),
                        model.getCustomModelId(), breed));
        redisTemplate.opsForValue().set(generationId,
                AiDto.Data.builder().userId(userId).conceptId(conceptId).build());

        return generationId;
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

    @Transactional
    @Override
    public void webhookUrlCheck(String url) throws Exception {
        JSONObject data = new JSONObject(url);
        System.out.println(url);
        System.out.println(data);
        String status = data.getString("status");
        String generationId = data.getString("id");
        try {
            String datasetId = data.getString("initDatasetId");
            if (datasetId != null) {
                log.info("datasetId : " + datasetId);
                AiDto.Data imageData = redisTemplate.opsForValue().get(datasetId);
                User user = userRepository.findByUserIdAndUserDeleteIsNull(imageData.getUserId()).orElseThrow();
                //모델학습 성공시 코인 소비
//                userService.useCoin(user.getUserId(), Coin.TRAIN_MODEL);
                String returnData = "model";
                if (status.equals("FAILED")) {
                    returnData = "model fail";
                } else {
                    modelRepository.findByDatasetId(datasetId).ifPresent(model -> model.updateSuccess());
                }
                //model은 sse안함
//                sseService.send(datasetId, returnData);
                if (user.getFcmToken() != null) {
                    Map<String, String> map = new HashMap<>();
                    map.put("url", returnData);
                    fcmService.sendMessageTo(NotificationMessage.builder()
                            .recipientToken(user.getFcmToken())
                            .data(map)
                            .build());
                }
                return;
            }
        } catch (Exception e) {
            log.info("사진 만들기 요청임");
        }
        AiDto.Data imageData = redisTemplate.opsForValue().get(generationId);
        redisTemplate.delete(generationId);
        User user = userRepository.findByUserIdAndUserDeleteIsNull(imageData.getUserId()).orElseThrow();
        if (status.equals("COMPLETE")) {
                String leonardoUrl = data.getJSONArray("images").getJSONObject(0).getString("url");
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
                Map<String, String> map = new HashMap<>();
                map.put("url", defaultUrl + s3Url);
                userService.useCoin(user.getUserId(), Coin.CREATE_IMAGE);
                sseService.send(generationId, defaultUrl + s3Url);
                if (user.getFcmToken() != null) {
                    fcmService.sendMessageTo(NotificationMessage.builder()
                            .recipientToken(user.getFcmToken())
                            .data(map)
                            .build());
                }
        } else if (status.equals("FAILED")) {
            Map<String, String> map = new HashMap<>();
            map.put("url", "image fail");
//            userService.useCoin(user.getUserId(), Coin.CREATE_IMAGE);
            sseService.send(generationId, "image fail");
            if (user.getFcmToken() != null) {
                fcmService.sendMessageTo(NotificationMessage.builder()
                        .recipientToken(user.getFcmToken())
                        .data(map)
                        .build());
            }
        }
    }

}
