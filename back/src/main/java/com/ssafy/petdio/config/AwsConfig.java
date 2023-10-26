package com.ssafy.petdio.config;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import java.beans.BeanProperty;

@Configuration
public class AwsConfig {

    @Value("${cloud.aws.credentials.S3accessKey}")
    private String S3AccessKey;

    @Value("${cloud.aws.credentials.S3SecretKey}")
    private String S3SecretKey;

    @Value("${cloud.aws.region.static}")
    private String region;


    @Bean
    public AmazonS3Client amazonS3Client() {
        BasicAWSCredentials basicAWSCredentials = new BasicAWSCredentials(S3AccessKey, S3SecretKey);

    }
}
