package com.ssafy.petdio.service;

import java.io.IOException;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.servlet.mvc.method.annotation.SseEmitter;

public interface AiService {
    String makeAiImage(Long conceptId, MultipartFile multipartFile, String breed, Long userId) throws IOException;
    void webhookUrlCheck(String url) throws Exception;

    String makerealPhotoImage(Long conceptId, String modelId, Long userId) throws  IOException;

}
