package com.ssafy.petdio.util;

import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.ssafy.petdio.config.LeonardoConfig;
import com.ssafy.petdio.entity.Enum.Prompt;
import com.ssafy.petdio.entity.Setting;
import jakarta.annotation.PostConstruct;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import okhttp3.*;
import org.json.JSONObject;
import org.springframework.stereotype.Component;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.ArrayList;
import java.util.List;

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
        log.info("image file !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!" + multipartFile.getContentType() + " " + multipartFile.getOriginalFilename());

        RequestBody requestBody = new FormBody.Builder()
                .add("extension", getFileExtension(multipartFile.getOriginalFilename())).build();


        JSONObject uploadInitResponse = null;

        try (Response response = client.newCall(getRequest(leonardoConfig.getInitImageURL(), requestBody)).execute()) {
            uploadInitResponse = new JSONObject(response.body().string());
        }
        log.info(uploadInitResponse.toString());
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
        String imageId = jsonResponse.getJSONObject("uploadInitImage").getString("id");


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

    public JSONObject putJsonPayload(List<Setting> settings, Prompt prompt, String imageId, String breed, String selectedModelId) {
        JSONObject generationPayload = new JSONObject();
        for (Setting setting : settings) {
            System.out.println(setting);
            switch (setting.getSettingType()) {
                case "double" -> generationPayload.put(setting.getSettingName(), Double.valueOf(setting.getSettingDetail()));
                case "integer" -> generationPayload.put(setting.getSettingName(), Integer.valueOf(setting.getSettingDetail()));
                case "boolean" -> generationPayload.put(setting.getSettingName(), setting.getSettingDetail().equals("true"));
                default -> generationPayload.put(setting.getSettingName(), setting.getSettingDetail());
            }
        }

        generationPayload.put("prompt", prompt.getPrompt().replace("breed", breed));
        log.info("프롬프트 breed종류: " + breed);
        generationPayload.put("negative_prompt", prompt.getNegativePrompt());
        generationPayload.put("init_image_id", imageId);
        generationPayload.put("modelId", selectedModelId);
        List<String> imagePrompts = new ArrayList<>();
        imagePrompts.add(imageId);
        generationPayload.put("imagePrompts", imagePrompts);

        return generationPayload;
    }

    public JSONObject realPhotoPutJsonPayload(List<Setting> settings, Prompt prompt, String modelId, String breed) {
        JSONObject generationPayload = new JSONObject();
        for (Setting setting : settings) {
            System.out.println(setting);
            switch (setting.getSettingType()) {
                case "double" -> generationPayload.put(setting.getSettingName(), Double.valueOf(setting.getSettingDetail()));
                case "integer" -> generationPayload.put(setting.getSettingName(), Integer.valueOf(setting.getSettingDetail()));
                case "boolean" -> generationPayload.put(setting.getSettingName(), setting.getSettingDetail().equals("true"));
                default -> generationPayload.put(setting.getSettingName(), setting.getSettingDetail());
            }
        }

        generationPayload.put("prompt", prompt.getPrompt().replace("breed", breed));
        generationPayload.put("negative_prompt", prompt.getNegativePrompt());
        generationPayload.put("modelId", modelId);

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

    public String createDataset(String datasetName){
        RequestBody requestBody = new FormBody.Builder()
                .add("name", datasetName).build();

        JSONObject createDatasetResponse = null;

        try (Response response = client.newCall(getRequest(leonardoConfig.getCreateDatasetURL(), requestBody)).execute()) {
            createDatasetResponse = new JSONObject(response.body().string());

            String datasetId = createDatasetResponse.getJSONObject("insert_datasets_one").getString("id");

            return datasetId;

        } catch (IOException e) {
            throw new RuntimeException(e);
        }
    }


    public void dataSetInit(String datasetId, List<MultipartFile> multipartFiles) throws IOException {

        for (MultipartFile multipartFile : multipartFiles) {
            log.info("사진 여러장 보내는중!!!!!!!!!" + multipartFile.getContentType() + " " + multipartFile.getOriginalFilename());

            String datasetURL = leonardoConfig.getCreateDatasetURL() + "/" + datasetId + "/upload";

            RequestBody requestBody = new FormBody.Builder()
                    .add("extension", getFileExtension(multipartFile.getOriginalFilename()))
                    .build();


            JSONObject uploadDatasetImageResponse = null;

            try (Response response = client.newCall(getRequest(datasetURL, requestBody)).execute()) {
                uploadDatasetImageResponse = new JSONObject(response.body().string());
            }
            log.info(uploadDatasetImageResponse.toString());

            // 로그 print용, 없어도 됨
            String imageId = uploadDatasetImageResponse.getJSONObject("uploadDatasetImage").getString("id");
            if (uploadDatasetImage(uploadDatasetImageResponse, multipartFile)) {
                log.info(imageId + " uploaded successfully.");
            }
        }

    }

    // Dataset용 이미지 업로드 메서드
    private boolean uploadDatasetImage (JSONObject jsonResponse, MultipartFile multipartFile) throws IOException {
        String fieldsString = jsonResponse.getJSONObject("uploadDatasetImage").getString("fields");
        JSONObject fieldsJson = new JSONObject(fieldsString);

        String urlUploadImage = jsonResponse.getJSONObject("uploadDatasetImage").getString("url");
        String imageId = jsonResponse.getJSONObject("uploadDatasetImage").getString("id");


        System.out.println(jsonResponse.getJSONObject("uploadDatasetImage"));

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

    public String trainModel(String modelName, String datasetId, String instancePrompt) {
        MediaType mediaType = MediaType.parse("application/json");
        String requestBodyJson = "{\"name\":\"" + modelName + "\",\"description\":\"\",\"datasetId\":\"" + datasetId + "\",\"instance_prompt\":\"" + instancePrompt + "\",\"modelType\":\"GENERAL\",\"nsfw\":false,\"resolution\":512,\"sd_version\":\"v1_5\",\"strength\":\"MEDIUM\"}";
        RequestBody requestBody = RequestBody.create(mediaType, requestBodyJson);

        JSONObject trainModelResponse = null;

        try (Response response = client.newCall(getRequest(leonardoConfig.getTrainModelURL(), requestBody)).execute()) {
            trainModelResponse = new JSONObject(response.body().string());

            log.info(String.valueOf(trainModelResponse));

            String customModelId = trainModelResponse.getJSONObject("sdTrainingJob").getString("customModelId");

            return customModelId;
        } catch (IOException e) {
            throw new RuntimeException(e);
        }
    }
}
