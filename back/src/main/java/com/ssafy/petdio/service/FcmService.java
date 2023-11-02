package com.ssafy.petdio.service;

import com.google.firebase.messaging.FirebaseMessaging;
import com.google.firebase.messaging.FirebaseMessagingException;
import com.google.firebase.messaging.Message;
import com.google.firebase.messaging.Notification;
import com.ssafy.petdio.model.dto.FcmDto;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
@Slf4j
public class FcmService {
    private final FirebaseMessaging firebaseMessaging;
    public void sendMessage(FcmDto.Request request) {
        Message message = Message.builder()
                .setToken(request.getId())
                .setNotification(Notification.builder()
                        .setTitle(request.getTitle())
                        .setBody(request.getBody())
                        .setImage(request.getImage())
                        .build())
                .putAllData(request.getData())
                .build();
        try {
            firebaseMessaging.send(message);
            log.info("fcm 성공!");
        } catch (FirebaseMessagingException e) {
            log.error("fcm 실패! " + e.getMessage());
        }
    }

}
