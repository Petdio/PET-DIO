package com.ssafy.petdio.service;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.google.auth.oauth2.GoogleCredentials;
import com.google.common.net.HttpHeaders;
import com.google.firebase.messaging.FirebaseMessaging;
import com.google.firebase.messaging.Message;
import com.ssafy.petdio.model.dto.FcmDto;
import com.ssafy.petdio.user.model.entity.User;
import com.ssafy.petdio.user.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import okhttp3.*;
import org.springframework.core.io.ClassPathResource;
import org.springframework.stereotype.Service;

import java.io.FileInputStream;
import java.io.IOException;
import java.util.List;
import java.util.Objects;
import java.util.Optional;

@Service
@RequiredArgsConstructor
@Slf4j
public class FcmService {
//    private final FirebaseMessaging firebaseMessaging;
    private final UserRepository userRepository;
    public void sendMessageTo(Long id) throws IOException {
        User user = userRepository.findByUserIdAndUserDeleteIsNull(id).orElseThrow();
        String token = "cSSKYNg6UT4Kkda3HLmLwy:APA91bEhnO-doBsdgxlSD6pKeJBRLqjjq8Sfcm9Rq46QkRRAgOlDkNPyhdyTSL6G7K1QyqTm8STbfV-GQXO7RFz0Rm873aHzku0LwiGl0IDl9NZ7ReuOoToZ0sJgX7p28CLFaR3_9nbf";
//            if(user.getFcmToken() != null) {
        if(token != null) {
                    String message = makeMessage(user.getFcmToken());
                    OkHttpClient client = new OkHttpClient();
                    RequestBody requestBody = RequestBody.create(message,
                            MediaType.get("application/json; charset=utf-8"));
                    Request request = new Request.Builder()
                            .url("https://fcm.googleapis.com/fcm/send")
                            .post(requestBody)
                            .addHeader(HttpHeaders.AUTHORIZATION, "Bearer " + getAccessToken())
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
        String serverPath = "/back/src/main/resources/serviceAccountKey.json";
        GoogleCredentials googleCredentials = GoogleCredentials.fromStream(new FileInputStream(serverPath))
                .createScoped(List.of("https://www.googleapis.com/auth/cloud-platform"));
        googleCredentials.refreshIfExpired();
        return googleCredentials.getAccessToken().getTokenValue();
    }

}
