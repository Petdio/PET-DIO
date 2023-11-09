package com.ssafy.petdio.config;

import lombok.Getter;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;

@Component
@Getter
public class LeonardoConfig {
    @Value("${LEONARDO_KEY}")
    private String key;

    @Value("${LEONARDO_INIT_IMAGE_URL}")
    private String initImageURL;

    @Value("${LEONARDO_GENERATION_IMAGE_URL}")
    private String generationImageURL;
}
