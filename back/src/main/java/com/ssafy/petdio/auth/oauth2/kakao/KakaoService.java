package com.ssafy.petdio.auth.oauth2.kakao;

import com.ssafy.petdio.auth.jwt.mapper.JwtMapper;
import com.ssafy.petdio.auth.jwt.service.JwtService;
import com.ssafy.petdio.auth.model.dto.AuthDto;
import com.ssafy.petdio.model.Enum.Role;
import com.ssafy.petdio.model.Enum.SocialType;
import com.ssafy.petdio.user.model.dto.UserDto;
import com.ssafy.petdio.user.model.dto.UserLoginDto;
import com.ssafy.petdio.user.model.entity.User;
import com.ssafy.petdio.user.model.mapper.UserMapper;
import com.ssafy.petdio.user.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.reactive.function.client.WebClient;

import java.util.Optional;
import java.util.concurrent.atomic.AtomicBoolean;

@Slf4j
@Service
@Transactional(readOnly = true)
@RequiredArgsConstructor
public class KakaoService {

    private final UserRepository userRepository;
    private final JwtService jwtService;
    // 회원가입시 1500원
    private static final int DEFAULT_COIN = 150;


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

        log.info("토큰 URL 생성");
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
    public AuthDto loginKakao(KakaoUserDto kakaoUserDto) throws Exception{
        log.info(kakaoUserDto.getAuthenticationCode(), "회원 카카오 로그인");

        AtomicBoolean check = new AtomicBoolean(false);

        Optional<User> optionalUser = userRepository.findByUserSocialIdAndUserDeleteIsNull(kakaoUserDto.getAuthenticationCode());
        User user = optionalUser.orElseGet(() -> {
            if (kakaoUserDto.getProperties() == null)
                return null;
            User newUser = User.builder()
                    .userNickname(kakaoUserDto.getProperties().getNickname())
                    .userEmail(kakaoUserDto.getKakaoAccount().getEmail())
                    .profileImage(kakaoUserDto.getProperties().getProfileImage())
                    .role(Role.USER)
                    .userSocialType(SocialType.KAKAO)
                    .userSocialId(kakaoUserDto.getAuthenticationCode())
                    .userCoin(DEFAULT_COIN)
                    .build();
            check.set(true);
            return userRepository.save(newUser);
        });
        if (user == null) throw new Exception("카카오에서 유저 정보 불러오기 실패");
        return AuthDto.builder()
                .newMember(check.get())
                .user(user)
                .build();
//        User user = null;
//        LoginUser loginUser = null;
//        // 회원가입돼있어
//        if (user.isPresent()) {
//            log.info("회원가입 된 멤버입니다.");
//            return user.get();
//        }
//        // 회원가입 안돼있음
//        // 카카오에서 정보가 제대로 받아와진 user면
//        if (kakaoUserDto.getProperties() != null) {
//            return userRepository.save(User.builder()
//                    .userNickname(kakaoUserDto.getProperties().getNickname())
//                    .userEmail(kakaoUserDto.getKakaoAccount().getEmail())
//                    .profileImage(kakaoUserDto.getProperties().getProfileImage())
//                    .role(Role.USER)
//                    .userSocialType(SocialType.KAKAO)
//                    .userSocialId(kakaoUserDto.getAuthenticationCode())
//                    .userCoin(DEFAULT_COIN)
//                    .build());
//        }
        // 카카오에서 제대로 안받아진 user면
//        return userRepository.save(User.builder()
//                .userNickname(null)
//                .userEmail(null)
//                .profileImage(null)
//                .role(Role.USER)
//                .userSocialType(SocialType.KAKAO)
//                .userSocialId(kakaoUserDto.getAuthenticationCode())
//                .build());
    }

    public UserLoginDto getUserLoginDto(AuthDto authDto) {
        UserDto userDto = UserMapper.INSTANCE.entityToUserDto(authDto.getUser());
        return UserLoginDto.builder().newMember(authDto.isNewMember())
                .accessToken(
                        jwtService.createAccessToken(JwtMapper.INSTANCE.userDtoToJwtDto(userDto)))
                .build();
    }
}