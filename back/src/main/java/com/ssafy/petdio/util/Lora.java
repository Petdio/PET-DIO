package com.ssafy.petdio.util;

import java.io.IOException;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import okhttp3.MediaType;
import okhttp3.OkHttpClient;
import okhttp3.Request;
import okhttp3.RequestBody;
import okhttp3.Response;
import org.springframework.stereotype.Component;

@Component
@RequiredArgsConstructor
@Slf4j
public class Lora {

    private String LoraUrl = "https://example.com/your-colab-endpoint";
    OkHttpClient client = new OkHttpClient();

    public void sendToLora() {
        String requestBody = "your_python_code_here";

        Request request = new Request.Builder()
                .url(LoraUrl)
                .post(RequestBody.create(MediaType.parse("application/json"), requestBody))
                .build();

        try {
            Response response = client.newCall(request).execute();
            System.out.println("HTTP Response Code: " + response.code());
            System.out.println("HTTP Response Body:\n" + response.body().string());
        } catch (IOException e) {
            e.printStackTrace();
        }
    }


}
