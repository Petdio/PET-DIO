package com.ssafy.petdio.util;

import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.ssafy.petdio.model.Enum.Prompt;
import com.ssafy.petdio.model.entity.Setting;
import java.io.*;

import com.ssafy.petdio.config.LeonardoConfig;
import jakarta.annotation.PostConstruct;
import java.util.List;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import okhttp3.*;
import org.json.*;
import org.springframework.stereotype.Component;
import org.springframework.web.multipart.MultipartFile;

@Component
@RequiredArgsConstructor
@Slf4j
public class Leonardo {
    private final LeonardoConfig leonardoConfig;
    private String AUTHORIZATION;

    OkHttpClient client = new OkHttpClient();

    @PostConstruct
    public void init() {
        AUTHORIZATION = "Bearer " + leonardoConfig.getKey();
    }

    public String init(MultipartFile multipartFile) throws IOException {
        RequestBody requestBody = new FormBody.Builder()
                .add("extension", getFileExtension(multipartFile.getOriginalFilename()))
                .build();

        JSONObject uploadInitResponse = null;

        try (Response response = client.newCall(getRequest(leonardoConfig.getInitImageURL(), requestBody)).execute()) {
            uploadInitResponse = new JSONObject(response.body().string());
        }

        String imageId = uploadInitResponse.getJSONObject("uploadInitImage").getString("id");

        if (uploadImage(uploadInitResponse, multipartFile)) {
            log.info(imageId + " uploaded successfully.");
        }
        return imageId;
    }

    private String getFileExtension(String fileName) {
        if (fileName != null && fileName.lastIndexOf(".") != -1) {
            return fileName.substring(fileName.lastIndexOf(".") + 1);
        }
        return "";
    }

    private Request getRequest(String url, RequestBody requestBody) {
        return new Request.Builder()
                .url(url)
                .post(requestBody)
                .addHeader("accept", "application/json")
                .addHeader("content-type", "application/json")
                .addHeader("authorization", AUTHORIZATION)
                .build();
    }

    private boolean uploadImage(JSONObject jsonResponse, MultipartFile multipartFile) throws IOException {
        String fieldsString = jsonResponse.getJSONObject("uploadInitImage").getString("fields");
        JSONObject fieldsJson = new JSONObject(fieldsString);

        String urlUploadImage = jsonResponse.getJSONObject("uploadInitImage").getString("url");

        System.out.println(jsonResponse.getJSONObject("uploadInitImage"));

        MultipartBody.Builder builderUploadImageRequest =
                new MultipartBody.Builder().setType(MultipartBody.FORM);

        for (String key : fieldsJson.keySet()) {
            builderUploadImageRequest.addFormDataPart(key, fieldsJson.getString(key));
        }

        builderUploadImageRequest.addFormDataPart(
                "file",
                multipartFile.getOriginalFilename(),
                RequestBody.create(MediaType.parse(multipartFile.getContentType()), multipartFile.getBytes())
        );

        MultipartBody uploadRequestBody=builderUploadImageRequest.build();

        Request uploadRequest=new Request.Builder()
                .url(urlUploadImage)
                .post(uploadRequestBody)
                .build();


        try(Response uploadResponse=client.newCall(uploadRequest).execute()){
            if (!uploadResponse.isSuccessful()) {
                System.out.println("Failed to upload image: " + uploadResponse.body().string());
                return false;
            }
            System.out.println("upload");
            System.out.println(uploadResponse.body());

            return true;
        }
    }

    public JSONObject putJsonPayload(List<Setting> settings, Prompt prompt, String imageId, String breed) {
        JSONObject generationPayload = new JSONObject();
        for (Setting setting : settings) {
            switch (setting.getSettingType()) {
                case "double" -> generationPayload.put(setting.getSettingName(), Double.valueOf(setting.getSettingDetail()));
                case "integer" -> generationPayload.put(setting.getSettingName(), Integer.valueOf(setting.getSettingDetail()));
                case "boolean" -> generationPayload.put(setting.getSettingName(), true);
                default -> generationPayload.put(setting.getSettingName(), setting.getSettingDetail());
            }
        }

        generationPayload.put("imagePrompts", prompt.getPrompt().replace("breed", breed));
        System.out.println(prompt.getPrompt().replace("breed", breed));
        generationPayload.put("negative_prompt", prompt.getNegativePrompt());
        generationPayload.put("init_image_id", imageId);
        return generationPayload;
    }

    public String generateAndFetchImages(JSONObject generationPayload) throws IOException {
        RequestBody generationRequestBody = RequestBody.create(
                MediaType.parse("application/json"),
                generationPayload.toString()
        );

        try (Response generationResponse = client.newCall(getRequest(leonardoConfig.getGenerationImageURL(),
                generationRequestBody)).execute()) {
            String responseBody = null;

            if(generationResponse.body() != null){
                responseBody = 	generationResponse.body().string();
            }

            if (!generationResponse.isSuccessful()) {
                log.error("Failed to generate images: " + responseBody);
                return null;
            }
            System.out.println(new JSONObject(responseBody).getJSONObject("sdGenerationJob")
                    .getString("generationId"));

            JSONObject jsonGenerationResponse = new JSONObject(responseBody);
            String generationId=jsonGenerationResponse
                    .getJSONObject("sdGenerationJob")
                    .getString("generationId");
            log.info(generationId + " 사진 변환 요청 성공");

            return generationId;
        }
    }

    public String getImageByGenerationId(String generationId) {
        Request getGenerationRequest = new Request.Builder()
                .url(leonardoConfig.getGenerationImageURL() + "/" + generationId)
                .get()
                .addHeader("accept", "application/json")
                .addHeader("authorization", AUTHORIZATION)
                .build();

        try (Response getGenerationResponse = client.newCall(getGenerationRequest).execute()) {
            log.info("generationResponseCode: " + getGenerationResponse.code());
            String jsonResponse = getGenerationResponse.body().string();
            log.info("generationResponseBody: " + jsonResponse);
            ObjectMapper objectMapper = new ObjectMapper();
            JsonNode jsonNode = objectMapper.readTree(jsonResponse);

            // "url" 필드 값 추출
            String imageUrl = jsonNode
                    .path("generations_by_pk")
                    .path("generated_images")
                    .get(0)
                    .path("url")
                    .asText();

            // imageUrl 값 출력
            log.info("URL: " + imageUrl);
            return imageUrl;
        } catch (IOException e) {
            throw new RuntimeException(e);
        }
    }

}
