package com.ssafy.petdio.domain.alert.service;

import com.google.firebase.messaging.FirebaseMessaging;
import com.google.firebase.messaging.FirebaseMessagingException;
import com.google.firebase.messaging.Message;
import com.ssafy.petdio.domain.alert.dto.FcmDto.NotificationMessage;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import java.io.IOException;

@Service
@RequiredArgsConstructor
@Slf4j
public class FcmService {
    private final FirebaseMessaging firebaseMessaging;
    public String sendMessageTo(NotificationMessage notificationMessage) throws IOException {
//        Notification notification = Notification.builder().setTitle(notificationMessage.getTitle()).setBody(
//                notificationMessage.getBody()).setImage(notificationMessage.getImage()).build();
        Message message = Message.builder().setToken(notificationMessage.getRecipientToken()).putAllData(notificationMessage.getData()).build();

        try {
            firebaseMessaging.send(message);
            return "success";
        } catch (FirebaseMessagingException e) {
            log.error(e.getMessage());
            throw new IOException("fcm 알림 전송 실패");
        }
    }
}
