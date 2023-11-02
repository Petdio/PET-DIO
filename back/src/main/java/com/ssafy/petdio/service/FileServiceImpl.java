package com.ssafy.petdio.service;

import com.amazonaws.AmazonServiceException;
import com.amazonaws.SdkClientException;
import com.amazonaws.services.s3.AmazonS3;
import com.amazonaws.services.s3.model.ObjectMetadata;
import com.amazonaws.services.s3.model.PutObjectRequest;
import com.amazonaws.services.s3.model.PutObjectResult;
import com.ssafy.petdio.model.dto.ImageInfo;

import java.awt.*;
import java.awt.image.BufferedImage;
import java.io.*;
import java.net.URL;
import java.net.URLConnection;
import java.util.UUID;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import javax.imageio.ImageIO;

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
            // 원본 이미지 로드
            BufferedImage originalImage = ImageIO.read(imageStream);

            // 워터마크 이미지 로드
            InputStream watermarkImageStream = getClass().getClassLoader().getResourceAsStream("watermark.png");
            BufferedImage watermarkImage = ImageIO.read(watermarkImageStream);

            // 워터마크 위치 설정
            int watermarkX = originalImage.getWidth() - watermarkImage.getWidth() - 10;
            int watermarkY = originalImage.getHeight() - watermarkImage.getHeight() - 10;

            // 원본 이미지에 워터마크 삽입
            Graphics2D graphics = originalImage.createGraphics();
            graphics.drawImage(watermarkImage, watermarkX, watermarkY, null);
            graphics.dispose();

            // 삽입된 워터마크가 있는 이미지를 ByteArrayOutputStream에 쓰기
            ByteArrayOutputStream os = new ByteArrayOutputStream();
            ImageIO.write(originalImage, "jpg", os);

            // ByteArrayOutputStream을 InputStream으로 변환
            InputStream is = new ByteArrayInputStream(os.toByteArray());

            // 메타데이터 설정
            ObjectMetadata om = new ObjectMetadata();
            om.setContentType(imageInfo.getContentType());
            om.setContentLength(is.available());
            PutObjectResult result = amazonS3.putObject(
                    new PutObjectRequest(bucket, fileName, is, om)
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