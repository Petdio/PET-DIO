package com.ssafy.petdio.service;

import com.amazonaws.AmazonServiceException;
import com.amazonaws.SdkClientException;
import com.amazonaws.services.s3.AmazonS3;
import com.amazonaws.services.s3.model.ObjectMetadata;
import com.amazonaws.services.s3.model.PutObjectRequest;
import com.amazonaws.services.s3.model.PutObjectResult;
import com.ssafy.petdio.model.dto.ImageInfo;
import java.io.IOException;
import java.io.InputStream;
import java.net.URL;
import java.net.URLConnection;
import java.util.UUID;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
@Slf4j
public class FileServiceImpl implements FileService{
    @Value("${cloud.aws.s3.bucket}")
    private String bucket;

    private final AmazonS3 amazonS3;


    private String getUUID(){
        return UUID.randomUUID().toString().replaceAll("-", "");
    }

    private ImageInfo downloadImageFromUrl(String imageUrl) throws IOException {
        URL url = new URL(imageUrl);
        URLConnection connection = url.openConnection();
        connection.connect();
        return ImageInfo.builder().contentType(connection.getContentType()).imageStream(connection.getInputStream()).build();
    }

    @Override
    public String upload(String imageUrl) throws IOException {
        ImageInfo imageInfo = downloadImageFromUrl(imageUrl);
        InputStream imageStream = imageInfo.getImageStream();
        String[] type = imageUrl.split("[.]");
        String fileName = getUUID() +"." + type[type.length-1];
        log.info(fileName);
        try {
            // 메타데이터 설정
            // 해당 설정이 없으면 "application/octet-stream"으로 설정되어 객체에 접근할때 다운로드 페이지가 뜬다
            // ContentType을 반드시 사진에서 추출해서 사용하도록 하자
            ObjectMetadata om = new ObjectMetadata();
            om.setContentType(imageInfo.getContentType());
            om.setContentLength(imageStream.available());
            PutObjectResult result = amazonS3.putObject(
                    new PutObjectRequest(bucket, fileName, imageStream, om)
            );
        } catch (AmazonServiceException e){
            log.error(e.getMessage());
            return "FAIL";
        } catch (SdkClientException e) {
            log.error(e.getMessage());
            return "FAIL";
        }
        return fileName;
    }
}