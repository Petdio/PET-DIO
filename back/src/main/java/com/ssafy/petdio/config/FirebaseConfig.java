package com.ssafy.petdio.config;

import com.google.auth.oauth2.GoogleCredentials;
import com.google.firebase.FirebaseApp;
import com.google.firebase.FirebaseOptions;
import com.google.firebase.messaging.FirebaseMessaging;
import jakarta.annotation.PostConstruct;
import java.io.FileInputStream;
import java.io.IOException;
import java.io.InputStream;
import java.util.List;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.core.io.ClassPathResource;
import org.springframework.core.io.Resource;

@Configuration
public class FirebaseConfig {

    @Bean
    FirebaseMessaging firebaseMessaging() throws IOException {
        ClassPathResource resource = new ClassPathResource("serviceAccountKey.json");

        InputStream inputStream = resource.getInputStream();
        GoogleCredentials credentials = GoogleCredentials.fromStream(inputStream);

        FirebaseOptions firebaseOptions = FirebaseOptions.builder().setCredentials(credentials).build();
        FirebaseApp app = FirebaseApp.initializeApp(firebaseOptions, "DEFAULT");

        return FirebaseMessaging.getInstance(app);
    }
}