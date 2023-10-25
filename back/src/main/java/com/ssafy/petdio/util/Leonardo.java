package com.ssafy.petdio.util;

import java.io.*;
import java.net.*;
import java.nio.file.*;
import javax.net.ssl.HttpsURLConnection;

import lombok.extern.slf4j.Slf4j;
import okhttp3.*;
import org.json.*;
import org.springframework.stereotype.Component;

@Component
@Slf4j
public class Leonardo {
    private static final String API_KEY = "bba9b4a2-b3f0-467a-a3d3-89a99a7833c1";
    private static final String AUTHORIZATION = "Bearer " + API_KEY;

    OkHttpClient client = new OkHttpClient();

    public void test2() throws IOException {

        // Get a presigned URL for uploading an image
        RequestBody requestBody = new FormBody.Builder()
                .add("extension", "jpg")
                .build();

        Request request = new Request.Builder()
                .url("https://cloud.leonardo.ai/api/rest/v1/init-image")
                .post(requestBody)
                .addHeader("accept", "application/json")
                .addHeader("content-type", "application/json")
                .addHeader("authorization", AUTHORIZATION)
                .build();

        try (Response response = client.newCall(request).execute()) {
            JSONObject jsonResponse = new JSONObject(response.body().string());

            String fieldsString = jsonResponse.getJSONObject("uploadInitImage").getString("fields");
            JSONObject fieldsJson = new JSONObject(fieldsString);

            String urlUploadImage = jsonResponse.getJSONObject("uploadInitImage").getString("url");

            String imageId = jsonResponse.getJSONObject("uploadInitImage").getString("id");

            // Upload image via presigned URL
            MultipartBody.Builder builderUploadImageRequest =
                    new MultipartBody.Builder().setType(MultipartBody.FORM);

            for (String key : fieldsJson.keySet()) {
                builderUploadImageRequest.addFormDataPart(key, fieldsJson.getString(key));
            }

            Path imagePath=Paths.get("C:\\Users\\SSAFY\\Desktop\\dog.jpg");
            byte[] imageData=Files.readAllBytes(imagePath);

            builderUploadImageRequest.addFormDataPart(
                    "file",
                    "dog.jpg",
                    RequestBody.create(MediaType.parse(Files.probeContentType(imagePath)), imageData)
            );

            MultipartBody uploadRequestBody=builderUploadImageRequest.build();

            Request uploadRequest=new Request.Builder()
                    .url(urlUploadImage)
                    .post(uploadRequestBody)
                    .build();

            try(Response uploadResponse=client.newCall(uploadRequest).execute()){
                System.out.println(uploadResponse.code());
                System.out.println(uploadResponse.body().string());

                if (uploadResponse.isSuccessful()) {
                    System.out.println(imageId + " uploaded successfully.");

                    // Generate with an image prompt
                    JSONObject generationPayload=new JSONObject();
                    generationPayload.put("height", 512);
                    generationPayload.put(
                            "modelId",
                            "2067ae52-33fd-4a82-bb92-c2c55e7d2786"
                    );
                    generationPayload.put(
                            "prompt",
                            "animal in picture that provided head logo"
                    );
                    generationPayload.put("width", 512);
                    generationPayload.put(
                            "imagePrompts",
                            new JSONArray().put(imageId)
                    );
                    generationPayload.put("alchemy", true);
                    generationPayload.put("seed", 830339840);
                    generationPayload.put("presetStyle", "ILLUSTRATION");





                    RequestBody generationRequestBody=RequestBody.create(
                            MediaType.parse("application/json"),
                            generationPayload.toString()
                    );

                    Request generationRequest=new Request.Builder()
                            .url("https://cloud.leonardo.ai/api/rest/v1/generations")
                            .post(generationRequestBody)
                            .addHeader("accept", "application/json")
                            .addHeader("content-type", "application/json")
                            .addHeader("authorization", AUTHORIZATION)
                            .build();

                    try(Response generationResponse=client.newCall(generationRequest).execute()){
                        System.out.println(generationResponse.code());
                        String generationResponseBody = generationResponse.body().string();
                        System.out.println(generationResponseBody);

                        if (generationResponse.isSuccessful()) {
                            JSONObject jsonGenerationResponse=new JSONObject(
                                    generationResponseBody
                            );
                            String generationId=jsonGenerationResponse
                                    .getJSONObject("sdGenerationJob")
                                    .getString("generationId");
                            System.out.println(generationId + " generated successfully.");
                            // Get the generation of images
                            String urlGetGeneration = "https://cloud.leonardo.ai/api/rest/v1/generations/" + generationId;

                            // Sleep for 20 seconds to wait for the image generation
                            try {
                                Thread.sleep(1000000);
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
                            }
                        }
                    }
                }
            }
        }
    }

    public void getImage(String generationId) throws IOException {
        String urlGetGeneration = "https://cloud.leonardo.ai/api/rest/v1/generations/" + generationId;

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
}