package com.ssafy.petdio.service;

import java.io.IOException;
import org.springframework.web.multipart.MultipartFile;

public interface AiService {
    void makeAiImage(Long conceptId, MultipartFile multipartFile) throws IOException;

    void S3ImageUpload(String bucket, String key, MultipartFile image) throws IOException;
}
