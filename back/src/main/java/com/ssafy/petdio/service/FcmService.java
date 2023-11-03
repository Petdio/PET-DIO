package com.ssafy.petdio.service;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.google.auth.oauth2.AccessToken;
import com.google.auth.oauth2.GoogleCredentials;
import com.google.common.net.HttpHeaders;
import com.ssafy.petdio.model.dto.FcmDto;
import com.ssafy.petdio.user.model.entity.User;
import com.ssafy.petdio.user.repository.UserRepository;
import java.io.InputStream;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import okhttp3.*;
import org.springframework.core.io.Resource;
import org.springframework.core.io.ResourceLoader;
import org.springframework.stereotype.Service;

import java.io.IOException;
import java.util.List;
import java.util.Objects;

@Service
@RequiredArgsConstructor
@Slf4j
public class FcmService {
//    private final FirebaseMessaging firebaseMessaging;
    private final UserRepository userRepository;
    private final ResourceLoader resourceLoader;
    public void sendMessageTo(Long id) throws IOException {
        User user = userRepository.findByUserIdAndUserDeleteIsNull(id).orElseThrow();
        String token = "cSSKYNg6UT4Kkda3HLmLwy:APA91bH5tbpVYGMSpmHL9DNtZm0aEWe1vspMmbYaD7Xi1CVncPcO4by8LWz4MHC0QRSmxl_J_a2Vd1KxcIOahLQTorIA82A-oNevVAUkUhIu7bgeV2qLKBM3xzVhJQshfCnnyg7r-hmL";
//            if(user.getFcmToken() != null) {
        if(token != null) {
//                    String message = makeMessage(user.getFcmToken());
                String message = makeMessage(token);
//            String message = makeMessage("ZHk82ZK62ea5kaIKnze-lyrlkNsWD5jzAYGaBnKBnrk");
                    OkHttpClient client = new OkHttpClient();
                    RequestBody requestBody = RequestBody.create(message,
                            MediaType.get("application/json; charset=utf-8"));
                    Request request = new Request.Builder()
                            .url("https://fcm.googleapis.com/fcm/send")
                            .post(requestBody)
                            .addHeader(HttpHeaders.AUTHORIZATION, "Bearer" + getAccessToken())
                            .addHeader(HttpHeaders.CONTENT_TYPE, "application/json; UTF-8")
                            .build();
                    Response response = client.newCall(request).execute();
                    log.info(Objects.requireNonNull(response.body()).string());
                } else {
                    log.info("알림은 허용이지만, 토큰이 없는 유저");
                }
    }

    private String makeMessage(String targetToken) throws JsonProcessingException {
        FcmDto.Request fcmMessage = FcmDto.Request.builder()
                .message(FcmDto.Message.builder()
                        .token(targetToken)
                        .notification(FcmDto.Notification.builder()
                                .title("AI 이미지 생성이 완료되었어요")
                                .body("생성된 AI 이미지를 확인해보세요!")
                                .image("https://velog.velcdn.com/images/kitaee/post/4f2102e2-1608-41fc-b64e-e7624a1324d9/image.jpg")
                                .build()
                        ).build()).validateOnly(false).build();
        return fcmMessage.toString();
    }

    private String getAccessToken() throws IOException {
        Resource resource = resourceLoader.getResource("classpath:serviceAccountKey.json");
        InputStream inputStream = resource.getInputStream();
        GoogleCredentials credentials = GoogleCredentials.fromStream(inputStream);
        credentials.refreshIfExpired();
        AccessToken token = credentials.getAccessToken();
        log.info("fcm token:" + token);
        return token.getTokenValue();
    }


}
