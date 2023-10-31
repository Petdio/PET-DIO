package com.ssafy.petdio.util;

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

    public String getFileExtension(String fileName) {
        if (fileName != null && fileName.lastIndexOf(".") != -1) {
            return fileName.substring(fileName.lastIndexOf(".") + 1);
        }
        return "";
    }

    public Request getRequest(String url, RequestBody requestBody) {
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

    public JSONObject putJsonPayload(List<Setting> settings, Prompt prompt, String imageId) {
        JSONObject generationPayload = new JSONObject();
        for (Setting setting : settings) {
            switch (setting.getSettingType()) {
                case "double" -> generationPayload.put(setting.getSettingName(), Double.valueOf(setting.getSettingDetail()));
                case "integer" -> generationPayload.put(setting.getSettingName(), Integer.valueOf(setting.getSettingDetail()));
                case "boolean" -> generationPayload.put(setting.getSettingName(), true);
                default -> generationPayload.put(setting.getSettingName(), setting.getSettingDetail());
            }
        }
        generationPayload.put("prompt", prompt.getPrompt());
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
            return fetchGeneratedImages(responseBody);
        }
    }

    private String fetchGeneratedImages(String responseBody) throws IOException {
        JSONObject jsonGenerationResponse=new JSONObject(responseBody);
        String generationId=jsonGenerationResponse
                .getJSONObject("sdGenerationJob")
                .getString("generationId");
        log.info(generationId + " generated successfully.");

        // Get the generation of images
        String urlGetGeneration = leonardoConfig.getGenerationImageURL() + "/" + generationId;

        try {
            Thread.sleep(20000);
        } catch (InterruptedException e) {
            e.printStackTrace();
        }


        Request getGenerationRequest = new Request.Builder()
                .url(urlGetGeneration)
                .get()
                .addHeader("accept", "application/json")
                .addHeader("authorization", AUTHORIZATION)
                .build();

        try (Response getGenerationResponse = client.newCall(getGenerationRequest).execute()) {
            System.out.println(getGenerationResponse.code());
            System.out.println(getGenerationResponse.body().string());

            JSONObject response = new JSONObject(getGenerationResponse.body());
            log.info(response.toString());
            log.info(response
                    .getJSONObject("generations_by_pk").toString());
            log.info(response
                    .getJSONObject("generations_by_pk")
                    .getJSONObject("generated_images").toString());
            String url = response
                    .getJSONObject("generations_by_pk")
                    .getJSONObject("generated_images")
                    .getString("url");
            log.info("url: " + url);
            return url;
        }
    }

//    public void initImage(String prompt, String imagePath) throws IOException {
//        JSONObject uploadInitResponse = getUploadInitResponse();
//        String imageId = uploadInitResponse.getJSONObject("uploadInitImage").getString("id");
//
//        // Upload image via presigned URL
//        byte[] imageData = readImageData(imagePath);
//
//        if (uploadImage(uploadInitResponse, imagePath, imageData)) {
//            log.info(imageId + " uploaded successfully.");
//            generateAndFetchImages(prompt, imageId);
//        }
//    }

//    private boolean uploadImage(JSONObject jsonResponse, String imagePath, byte[] imageData) throws IOException {
//        String fieldsString = jsonResponse.getJSONObject("uploadInitImage").getString("fields");
//        JSONObject fieldsJson = new JSONObject(fieldsString);
//
//        String urlUploadImage = jsonResponse.getJSONObject("uploadInitImage").getString("url");
//
//        System.out.println(jsonResponse.getJSONObject("uploadInitImage"));
//
//        MultipartBody.Builder builderUploadImageRequest =
//                new MultipartBody.Builder().setType(MultipartBody.FORM);
//
//        for (String key : fieldsJson.keySet()) {
//            builderUploadImageRequest.addFormDataPart(key, fieldsJson.getString(key));
//        }
//
//        builderUploadImageRequest.addFormDataPart(
//                "file",
//                Paths.get(imagePath).getFileName().toString(),
//                RequestBody.create(MediaType.parse(Files.probeContentType(Paths.get(imagePath))), imageData)
//        );
//
//        MultipartBody uploadRequestBody=builderUploadImageRequest.build();
//
//        Request uploadRequest=new Request.Builder()
//                .url(urlUploadImage)
//                .post(uploadRequestBody)
//                .build();
//
//
//        try(Response uploadResponse=client.newCall(uploadRequest).execute()){
//            if (!uploadResponse.isSuccessful()) {
//                System.out.println("Failed to upload image: " + uploadResponse.body().string());
//                return false;
//            }
//            System.out.println("upload");
//            System.out.println(uploadResponse.body());
//
//            return true;
//        }
//    }

//    private void generateAndFetchImages(String prompt, String imageId) throws IOException {
//
//        // Generate with an image prompt
//        JSONObject generationPayload = new JSONObject();
//        generationPayload.put("height", 832);
//        generationPayload.put(
//                "modelId",
//                "f3296a34-9aef-4370-ad18-88daf26862c3"
//        );
//        log.info(prompt);
//        generationPayload.put(
//                "prompt",
//                prompt
//        );
//        generationPayload.put("negative_prompt", "low quality, Bad anatomy, Bad eyes, Disfigured, Crossed eyes, Poorly drawn face, mutation, mutated" +
//                "((extra limb)), ugly, missing limb, floating limbs, disconnected limbs,  malformed hands, blur, out of focus, long neck," +
//                "long body, two face, out of frame, text, error, cropped, 3 shoes, 3 legs, 2 ears, ");
//
//        generationPayload.put("width", 640);
//
//        generationPayload.put("seed", Integer.valueOf("130472704"));
//        generationPayload.put("presetStyle", "LEONARDO");
//        generationPayload.put("promptMagicVersion", "v2");
//        generationPayload.put("guidance_scale", 7);
//
//
////        generationPayload.put("promptMagicStrength", 0.55);
////        generationPayload.put("alchemy", true);
//
//
//        generationPayload.put("init_image_id", imageId);
//        generationPayload.put("init_strength", 0.25);
//        generationPayload.put("num_images", 1);
//
////        generationPayload.put("init_generation_image_id", "eaac59af-881a-4713-b0a7-2afbc0160141");
//        //위에 왜 안되는지 모르겠음
//
//
//        RequestBody generationRequestBody = RequestBody.create(
//                MediaType.parse("application/json"),
//                generationPayload.toString()
//        );
//
//
//        try (Response generationResponse = client.newCall(getRequest(leonardoConfig.getGenerationImageURL(),
//                generationRequestBody)).execute()) {
//            String responseBody = null;
//
//            if(generationResponse.body() != null){
//                responseBody = 	generationResponse.body().string();
//            }
//
//            if (!generationResponse.isSuccessful()) {
//                log.error("Failed to generate images: " + responseBody);
//                return;
//            }
//            System.out.println(new JSONObject(responseBody).getJSONObject("sdGenerationJob")
//                    .getString("generationId"));
//            fetchGeneratedImages(responseBody);
//        }
//    }

//    private JSONObject getUploadInitResponse() throws IOException {
//        RequestBody requestBody = new FormBody.Builder()
//                .add("extension", "jpg")
//                .build();
//
//        try (Response response = client.newCall(getRequest(leonardoConfig.getInitImageURL(), requestBody)).execute()) {
//            return new JSONObject(response.body().string());
//        }
//    }


    public void getImage(String id) throws IOException {
        log.info(id + " getImage");

        // Get the generation of images
        String urlGetGeneration = leonardoConfig.getGenerationImageURL() + "/" + id;

        Request getGenerationRequest = new Request.Builder()
                .url(urlGetGeneration)
                .get()
                .addHeader("accept", "application/json")
                .addHeader("authorization", AUTHORIZATION)
                .build();

        try (Response getGenerationResponse = client.newCall(getGenerationRequest).execute()) {
            System.out.println(getGenerationResponse.code());
            System.out.println(getGenerationResponse.body().string());
        }
    }


//    private void fetchGeneratedImages(String responseBody) throws IOException {
//        JSONObject jsonGenerationResponse=new JSONObject(responseBody);
//        String generationId=jsonGenerationResponse
//                .getJSONObject("sdGenerationJob")
//                .getString("generationId");
//        log.info(generationId + " generated successfully.");
//
//        // Get the generation of images
//        String urlGetGeneration = leonardoConfig.getGenerationImageURL() + "/" + generationId;
//
//        try {
//            Thread.sleep(20000);
//        } catch (InterruptedException e) {
//            e.printStackTrace();
//        }
//
//
//        Request getGenerationRequest = new Request.Builder()
//                .url(urlGetGeneration)
//                .get()
//                .addHeader("accept", "application/json")
//                .addHeader("authorization", AUTHORIZATION)
//                .build();
//
//        try (Response getGenerationResponse = client.newCall(getGenerationRequest).execute()) {
//            System.out.println(getGenerationResponse.code());
//            System.out.println(getGenerationResponse.body().string());
//        }
//    }

}
