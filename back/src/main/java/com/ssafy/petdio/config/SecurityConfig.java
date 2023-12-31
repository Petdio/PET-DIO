package com.ssafy.petdio.config;

import com.ssafy.petdio.domain.auth.jwt.JwtAuthenticationProcessingFilter;
import com.ssafy.petdio.domain.auth.jwt.service.JwtService;
import jakarta.servlet.Filter;
import lombok.RequiredArgsConstructor;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.AuthenticationServiceException;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configurers.AbstractHttpConfigurer;
import org.springframework.security.config.annotation.web.configurers.HeadersConfigurer.FrameOptionsConfig;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;
import org.springframework.security.web.util.matcher.AntPathRequestMatcher;

@Configuration
@EnableWebSecurity
@RequiredArgsConstructor
public class SecurityConfig {
    private final JwtService jwtService;

    @Bean
    public SecurityFilterChain filterChain(HttpSecurity http) throws Exception {
        http
                .addFilterBefore(jwtAuthenticationProcessingFilter(), UsernamePasswordAuthenticationFilter.class)
                .csrf(AbstractHttpConfigurer::disable)
                .sessionManagement(sessionManagement ->
                        sessionManagement.sessionCreationPolicy(SessionCreationPolicy.STATELESS))
                .httpBasic(AbstractHttpConfigurer::disable)
                .authorizeHttpRequests(requests -> requests
                        .requestMatchers("/album/**").authenticated()
                        .requestMatchers("/concept/**").authenticated()
                        .requestMatchers("/user/**").authenticated()
                        .requestMatchers("/ai/create").authenticated()
                        .requestMatchers("/model/**").authenticated()
                        .requestMatchers("/ai/**").authenticated()
                        .requestMatchers(new AntPathRequestMatcher("/ai/webhook")).permitAll()
                        .anyRequest().permitAll())
                .headers(headers -> headers.frameOptions(FrameOptionsConfig::disable));
        return http.build();
    }

    @Bean
    public AuthenticationManager noopAuthenticationManager() {
        return authentication -> {
            throw new AuthenticationServiceException("Authentication is disabled");
        };
    }

    private Filter jwtAuthenticationProcessingFilter() {

        return new JwtAuthenticationProcessingFilter(jwtService);
    }
}