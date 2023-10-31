package com.ssafy.petdio.auth.oauth2.kakao;

import com.ssafy.petdio.auth.jwt.service.JwtService;
import com.ssafy.petdio.model.Enum.SocialType;
import com.ssafy.petdio.model.dto.UserDto;
import com.ssafy.petdio.model.dto.UserLoginDto;
import com.ssafy.petdio.model.Enum.Role;
import com.ssafy.petdio.model.entity.User;
import com.ssafy.petdio.repository.UserRepository;
import com.ssafy.petdio.model.mapper.UserMapper;
import com.ssafy.petdio.auth.jwt.mapper.JwtMapper;
import lombok.RequiredArgsConstructor;

import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.reactive.function.client.WebClient;

import java.util.Optional;

@Slf4j
@Service
@Transactional(readOnly = true)
@RequiredArgsConstructor
public class KakaoService {

    private final UserRepository userRepository;
    private final JwtService jwtService;


    @Value("${KAKAO_RESTAPI_KEY}")
    private String KAKAO_RESTPAPI_KEY;
    @Value("${KAKAO_REDIRECT_URI}")
    private String KAKAO_REDIRECT_URL;

    private final WebClient webClient;

    public KakaoTokenDto getKakaoAccessToken(String code) {
        String getTokenURL =
                "https://kauth.kakao.com/oauth/token?grant_type=authorization_code&client_id="
                        + KAKAO_RESTPAPI_KEY + "&redirect_uri=" + KAKAO_REDIRECT_URL + "&code="
                        + code;

        System.out.println("토큰 URL 생성");
        return webClient.post()
                .uri(getTokenURL)
                .retrieve()
                .bodyToMono(KakaoTokenDto.class).block();
    }

    public KakaoUserDto getKakaoUser(String kakaoAccessToken) {
        String getUserURL = "https://kapi.kakao.com/v2/user/me";

        return webClient.post()
                .uri(getUserURL)
                .header("Authorization", "Bearer " + kakaoAccessToken)
                .retrieve()
                .bodyToMono(KakaoUserDto.class)
                .block();
    }

    @Transactional
    public User loginKakao(KakaoUserDto kakaoUserDto) {
        log.info(kakaoUserDto.getAuthenticationCode(), "회원 카카오 로그인");

        Optional<User> user = userRepository.findByUserSocialIdAndUserDeleteIsNull(
                kakaoUserDto.getAuthenticationCode());

        if (user.isPresent()) {
            log.info("회원가입 된 멤버입니다.");
            // TODO
            //  JWT Return Code Need
            return user.orElseThrow();
        }
        if (kakaoUserDto.getProperties() != null) {
            return userRepository.save(User.builder()
                    .userNickname(kakaoUserDto.getProperties().getNickname())
                    .userEmail(kakaoUserDto.getKakaoAccount().getEmail())
                    .profileImage(kakaoUserDto.getProperties().getProfileImage())
                    .role(Role.USER)
                    .userSocialType(SocialType.KAKAO)
                    .userSocialId(kakaoUserDto.getAuthenticationCode())
//                    .userToken()
                    .build());
        }
        return userRepository.save(User.builder()
                .userNickname(null)
                .userEmail(null)
                .profileImage(null)
                .role(Role.USER)
                .userSocialType(SocialType.KAKAO)
                .userSocialId(kakaoUserDto.getAuthenticationCode())
                .build());
    }

    public UserLoginDto getUserLoginDto(User user) {
        UserDto userDto = UserMapper.INSTANCE.entityToUserDto(user);
        return UserLoginDto.builder().userDto(userDto)
                .accessToken(
                        jwtService.createAccessToken(JwtMapper.INSTANCE.userDtoToJwtDto(userDto)))
                .build();
    }
}