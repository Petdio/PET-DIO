package com.ssafy.petdio.service;

import java.io.IOException;
import org.springframework.web.multipart.MultipartFile;

public interface AiService {
    void makeAiImage(Long conceptId, MultipartFile multipartFile, Long userId) throws IOException;

    String getImage(String leonardoUrl) throws Exception;
}
