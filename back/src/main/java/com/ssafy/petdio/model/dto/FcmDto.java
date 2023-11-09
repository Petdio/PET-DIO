package com.ssafy.petdio.model.dto;

import com.google.firebase.messaging.Message;
import java.util.List;
import java.util.Map;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

public class FcmDto {

    @Getter
    @Setter
    @ToString
    @Builder
    @AllArgsConstructor
    @NoArgsConstructor
    @Data
    public static class NotificationMessage {
        private String recipientToken;
        private String title;
        private String body;
        private String image;
        private Map<String, String> data;
    }
//
//    @Getter
//    @Setter
//    @ToString
//    @Builder
//    @AllArgsConstructor
//    @NoArgsConstructor
//    public static class Request {
//        private Message message;
//        private boolean validateOnly;
//    }
//
//
//    @Getter
//    @Setter
//    @ToString
//    @Builder
//    @AllArgsConstructor
//    @NoArgsConstructor
//    public static class Message
//        private Notification notification;
//        private String token;
//    }
//
//    @Getter
//    @Setter
//    @ToString
//    @Builder
//    @AllArgsConstructor
//    @NoArgsConstructor
//    public static class Notification {
//        private String title;
//        private String body;
//        private String image;
//
//    }

}
