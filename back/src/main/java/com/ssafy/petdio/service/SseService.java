package com.ssafy.petdio.service;

import com.ssafy.petdio.repository.EmitterRepository;
import java.io.IOException;
import java.util.Map;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.web.servlet.mvc.method.annotation.SseEmitter;


@Service
@RequiredArgsConstructor
@Slf4j
public class SseService {

    private final EmitterRepository emitterRepository;

    private final static Long DEFAULT_TIMEOUT = 3600000L;
    private final static String NOTIFICATION_NAME = "notify";

    public SseEmitter connectNotification(String generationId) {
        // 새로운 SseEmitter를 만든다
        SseEmitter sseEmitter = new SseEmitter(DEFAULT_TIMEOUT);
        System.out.println("connect: " + sseEmitter);

        // 유저 ID로 SseEmitter를 저장한다. 
        emitterRepository.save(generationId, sseEmitter);

        // 세션이 종료될 경우 저장한 SseEmitter를 삭제한다.
        sseEmitter.onCompletion(() -> emitterRepository.delete(generationId));
        sseEmitter.onTimeout(() -> emitterRepository.delete(generationId));

        // 503 Service Unavailable 오류가 발생하지 않도록 첫 데이터를 보낸다.
        try {
            sseEmitter.send(SseEmitter.event().id(generationId).name(NOTIFICATION_NAME).data("Connection completed"));
        } catch (IOException e) {
            log.error(e.getMessage());
        }
        return sseEmitter;
    }

    public void send(String generationId, String urlOrFail) {
        emitterRepository.get(generationId).ifPresentOrElse(sseEmitter -> {
            try {
                System.out.println("send: " + sseEmitter);
                sseEmitter.send(SseEmitter.event().id(generationId).name(NOTIFICATION_NAME).data(urlOrFail));
            } catch (IOException e) {
                emitterRepository.delete(generationId);
                log.error(e.getMessage());
            }
        }, () -> log.info("No emitter found"));
    }
}
