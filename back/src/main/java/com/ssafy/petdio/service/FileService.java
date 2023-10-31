package com.ssafy.petdio.service;

import java.io.IOException;
import org.springframework.web.multipart.MultipartFile;

public interface FileService {

    String upload(String imageUrl) throws IOException;
}
