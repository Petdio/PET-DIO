package com.ssafy.petdio.domain.alert.repository;

import java.util.HashMap;
import java.util.Map;
import java.util.Optional;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Repository;
import org.springframework.web.servlet.mvc.method.annotation.SseEmitter;

@Slf4j
@Repository
public class EmitterRepository {

    // 유저ID를 키로 SseEmitter를 해시맵에 저장할 수 있도록 구현했다.
    private Map<String, SseEmitter> emitterMap = new HashMap<>();

    public SseEmitter save(String generationId, SseEmitter sseEmitter) {
        emitterMap.put(generationId, sseEmitter);
        log.info("Saved SseEmitter for {}", generationId);
        return sseEmitter;
    }

    public Optional<SseEmitter> get(String generationId) {
        log.info("Got SseEmitter for {}", generationId);
        return Optional.ofNullable(emitterMap.get(generationId));
    }

    public void delete(String generationId) {
        emitterMap.remove(generationId);
        log.info("Deleted SseEmitter for {}", generationId);
    }

//    private String getKey(Long userId) {
//        return "Emitter:UID:" + userId;
//    }
}