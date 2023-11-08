package com.ssafy.petdio.service;

import java.io.IOException;
import org.springframework.web.multipart.MultipartFile;

public interface AiService {
    void makeAiImage(Long conceptId, MultipartFile multipartFile, String breed, Long userId) throws IOException;

    void getImage(String leonardoUrl) throws Exception;

    void webhookUrlCheck(String url) throws Exception;
}
