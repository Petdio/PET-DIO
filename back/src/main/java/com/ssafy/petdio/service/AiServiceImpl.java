package com.ssafy.petdio.service;

import com.ssafy.petdio.repository.SettingRepository;
import java.util.Map;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
@Slf4j
public class AiServiceImpl implements AiService {
    private final SettingRepository settingRepository;

    @Override
    public void makeAiImage(Long conceptId) {
        Map<String, String> settings = settingRepository.findSettingNameAndDetailByConceptId(conceptId);
        System.out.println(settings);
    }
}
