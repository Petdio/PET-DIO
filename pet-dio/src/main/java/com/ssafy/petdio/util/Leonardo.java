package com.ssafy.petdio.util;


import com.fasterxml.jackson.databind.ObjectMapper;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Component;

import java.io.IOException;
import java.net.URI;
import java.net.http.HttpClient;
import java.net.http.HttpRequest;
import java.net.http.HttpResponse;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.nio.file.StandardOpenOption;
import java.util.HashMap;
import java.util.Map;
import java.util.concurrent.TimeUnit;

@Component
@Slf4j
public class Leonardo {

    public void requestTest() throws IOException, InterruptedException {
        HttpRequest request = HttpRequest.newBuilder()
                .uri(URI.create("https://cloud.leonardo.ai/api/rest/v1/generations"))
                .header("accept", "application/json")
                .header("content-type", "application/json")
                .header("authorization", "Bearer bba9b4a2-b3f0-467a-a3d3-89a99a7833c1")
                .method("POST", HttpRequest.BodyPublishers.ofString("{\"height\":512,\"modelId\":\"6bef9f1b-29cb-40c7-b9df-32b51c1f67d3\",\"prompt\":\"An oil painting of a cat\",\"width\":512}"))
                .build();
        HttpResponse<String> response = HttpClient.newHttpClient().send(request, HttpResponse.BodyHandlers.ofString());
        System.out.println(response.body());
    }

    public void test2() throws IOException, InterruptedException {
        String api_key = "bba9b4a2-b3f0-467a-a3d3-89a99a7833c1";
        String authorization = "Bearer " + api_key;

        Map<String, String> headers = new HashMap<>();
        headers.put("accept", "application/json");
        headers.put("content-type", "application/json");
        headers.put("authorization", authorization);

        // Get a presigned URL for uploading an image
        String url = "https://cloud.leonardo.ai/api/rest/v1/init-image";

        String payload = "{\"extension\": \"jpg\"}";

        HttpRequest request = HttpRequest.newBuilder()
                .uri(URI.create(url))
                .POST(HttpRequest.BodyPublishers.ofString(payload))
                .headers("accept", "application/json", "content-type", "application/json", "authorization", authorization)
                .build();

        HttpResponse<String> response = HttpClient.newHttpClient().send(request, HttpResponse.BodyHandlers.ofString());

        System.out.println(response.statusCode());

        // Parse the response JSON
        ObjectMapper objectMapper = new ObjectMapper();
        Map<String, Object> responseJson = objectMapper.readValue(response.body(), Map.class);

        Map<String, String> fields = (Map<String, String>) responseJson.get("uploadInitImage");
        String uploadUrl = fields.get("url");
        String imageId = fields.get("id"); // For getting the image later
        System.out.println("uploadUrl " + uploadUrl);
        System.out.println("imageId " + imageId);

        String imageFilePath = "C:\\Users\\SSAFY\\Desktop\\dog.jpg";
        Path imageFile = Paths.get(imageFilePath);

        // Upload image via presigned URL
        HttpRequest uploadRequest = HttpRequest.newBuilder()
                .uri(URI.create(uploadUrl))
                .POST(HttpRequest.BodyPublishers.ofFile(imageFile))
                .headers("accept", "application/json", "content-type", "application/json", "authorization", authorization)
                .build();

        HttpResponse<String> uploadResponse = HttpClient.newHttpClient().send(uploadRequest, HttpResponse.BodyHandlers.ofString());

        System.out.println(uploadResponse.statusCode());

        // Generate with an image prompt
        url = "https://cloud.leonardo.ai/api/rest/v1/generations";

        String promptPayload = "{\"height\": 512, \"modelId\": \"6bef9f1b-29cb-40c7-b9df-32b51c1f67d3\", " +
                "\"prompt\": \"An oil painting of a cat\", \"width\": 512, \"imagePrompts\": [" + imageId + "]}";

        HttpRequest promptRequest = HttpRequest.newBuilder()
                .uri(URI.create(url))
                .POST(HttpRequest.BodyPublishers.ofString(promptPayload))
                .headers("accept", "application/json", "content-type", "application/json", "authorization", authorization)
                .build();

        HttpResponse<String> promptResponse = HttpClient.newHttpClient().send(promptRequest, HttpResponse.BodyHandlers.ofString());

        System.out.println(promptResponse.statusCode());
        System.out.println(objectMapper.readTree(promptResponse.body()));

        // Get the generation of images
        String generationId = objectMapper.readTree(promptResponse.body()).get("sdGenerationJob").get("generationId").asText();

        url = "https://cloud.leonardo.ai/api/rest/v1/generations/" + generationId;

        TimeUnit.SECONDS.sleep(20);

        HttpRequest getResultRequest = HttpRequest.newBuilder()
                .uri(URI.create(url))
                .GET()
                .headers("accept", "application/json", "content-type", "application/json", "authorization", authorization)
                .build();

        HttpResponse<String> resultResponse = HttpClient.newHttpClient().send(getResultRequest, HttpResponse.BodyHandlers.ofString());

        System.out.println(resultResponse.body());
    }
}
