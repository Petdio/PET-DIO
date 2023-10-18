package com.ssafy.petdio.service;

import com.ssafy.petdio.model.Enum.SocialType;
import com.ssafy.petdio.model.dto.Oauth2DTO;
import com.ssafy.petdio.model.dto.UserDTO;
import com.ssafy.petdio.model.entity.User;
import com.ssafy.petdio.repository.UserRepository;
import com.ssafy.petdio.util.Oauth2Client;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpEntity;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.http.HttpHeaders;
import org.springframework.util.LinkedMultiValueMap;
import org.springframework.web.client.RestTemplate;

import java.nio.charset.StandardCharsets;
import java.util.Optional;

@Service
@RequiredArgsConstructor
@Slf4j
public class Oauth2ServiceImpl implements Oauth2Service{
    private final Oauth2Client oauth2Client;
    private final UserRepository userRepository;
    private final UserService userService;

    @Override
    public UserDTO.LoginResponse kakaoLogin(String code) {
        Oauth2DTO.KakaoTokenResponse kakaoToken = kakaoGetToken(code);
        Oauth2DTO.KakaoUserResponse kakaoUser = kakaoGetUser(kakaoToken);
        Optional<User> optionalUser = userRepository.findByUserEmail(kakaoUser.getKakaoAccount().getEmail());
        User user = null;
        if (optionalUser.isPresent()) {
            log.info("회원가입된 유저");
            user = optionalUser.get();
        } else {
            log.info("회원가입");
            user = signup(kakaoUser);
        }
        log.info("User login : " + user);
        return userService.login(user);
    }

    @Transactional
    public User signup(Oauth2DTO.KakaoUserResponse kakaoUser) {
        return userRepository.save(
                User.builder()
                        .userNickname(kakaoUser.getProperties().getNickname())
                        .userEmail(kakaoUser.getKakaoAccount().getEmail())
                        .userSocialId(kakaoUser.getId())
                        .userSocialType(SocialType.kakao.getId())
                        .build()
        );
    }

    //카카오 토큰 받기
    private Oauth2DTO.KakaoTokenResponse kakaoGetToken(String code) {
        log.info("kakao login get token");
        LinkedMultiValueMap<String, String> parameters = new LinkedMultiValueMap<>();
        parameters.add("grant_type", oauth2Client.getAuthorizationGrantType());
        parameters.add("client_id", oauth2Client.getClientId());
        parameters.add("redirect_uri", oauth2Client.getRedirectUri());
        parameters.add("code", code);

        log.info("kakao send token");
        HttpHeaders httpHeaders = new HttpHeaders();

        return sendPost(new HttpEntity<>(parameters, makeHttpHeader(httpHeaders)), Oauth2DTO.KakaoTokenResponse.class, oauth2Client.getTokenUri());
    }

    private Oauth2DTO.KakaoUserResponse kakaoGetUser(final Oauth2DTO.KakaoTokenResponse response) {
        log.info("kakao get user");
        HttpHeaders httpHeaders = new HttpHeaders();
        httpHeaders.set(HttpHeaders.AUTHORIZATION, "Bearer " + response.getAccess_token());

        return sendPost(new HttpEntity<>(makeHttpHeader(httpHeaders)), Oauth2DTO.KakaoUserResponse.class, oauth2Client.getUserInfoUri());
    }

    private HttpHeaders makeHttpHeader(HttpHeaders httpHeaders) {
        MediaType mediaType = new MediaType(MediaType.APPLICATION_FORM_URLENCODED, StandardCharsets.UTF_8);
        httpHeaders.setContentType(mediaType);

        return httpHeaders;
    }

    private <T>T sendPost(HttpEntity httpEntity, Class<T> classType, String uri) {
        RestTemplate restTemplate = new RestTemplate();
        ResponseEntity<T> responseEntity = restTemplate.postForEntity(
                uri,
                httpEntity,
                classType
        );
        return responseEntity.getBody();
    }
}
