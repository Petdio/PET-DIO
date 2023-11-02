package com.ssafy.petdio.service;

import java.io.IOException;
import org.springframework.web.multipart.MultipartFile;

public interface AiService {
    String makeAiImage(Long conceptId, MultipartFile multipartFile,String breed) throws IOException;
}
