package com.ssafy.petdio.service;

import com.ssafy.petdio.user.repository.UserRepository;
import com.ssafy.petdio.user.service.UserService;
import com.ssafy.petdio.util.Leonardo;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

@Service
@RequiredArgsConstructor
@Slf4j
public class ModelServeiceImpl implements ModelService{

    private final Leonardo leonardo;
    private final FileService fileService;
    private final UserRepository userRepository;
    private final UserService userService;

    @Override
    public String makeDataset(String datasetName, MultipartFile multipartFile, Long userId) {

        String datasetId = leonardo.createDataset(datasetName);



        return null;
    }

    @Override
    public String trainModel(String modelName, String datasetId, String instancePrompt) {
        return null;
    }
}
