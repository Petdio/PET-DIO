package com.ssafy.petdio.auth.jwt;

import com.ssafy.petdio.auth.jwt.service.JwtService;

import com.ssafy.petdio.exceptions.UnAuthorizedException;
import io.micrometer.common.util.StringUtils;
import jakarta.servlet.FilterChain;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletRequestWrapper;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpHeaders;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;
import org.springframework.web.server.ServerWebExchange;

import java.util.Collections;
import java.util.Enumeration;

@Slf4j
@RequiredArgsConstructor
@Component
public class JwtAuthenticationProcessingFilter extends OncePerRequestFilter {

    private final JwtService jwtService;

    @Override
    protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response,
                                    FilterChain filterChain) throws UnAuthorizedException {
        try {
            Enumeration<String> authorizationHeaders = request.getHeaders(HttpHeaders.AUTHORIZATION);

            if (!authorizationHeaders.hasMoreElements()) {
                log.error("토큰 없음");
                request.setAttribute("unauthorization", "토큰 없음.");
                filterChain.doFilter(request, response);
                return;
            }

            String jwt = authorizationHeaders.nextElement().replace("Bearer ", "");
            log.info("jwt: " + jwt);

            if (StringUtils.isEmpty(jwt) || !jwtService.checkToken(jwt)) {
                log.error("인증 실패");
                response.setStatus(HttpServletResponse.SC_UNAUTHORIZED);
                response.getWriter().write("Unauthorized: Invalid token.");
                return;
            }

            Authentication authentication = jwtService.getAuthentication(jwt); // 저장한 authentication 획득

            // Security 세션에서 계속 사용하기 위해 SecurityContext에 Authentication 등록
            SecurityContextHolder.getContext().setAuthentication(authentication);

            // JWT에서 가져온 사용자 정보와 저장한 Authentication의 사용자 정보 비교
            if (isTokenUserInfoMatching(authentication, jwt)) {
                log.info("검증 성공");
                // 사용자 정보가 일치하면 요청 계속 진행
                filterChain.doFilter(request, response);
            } else {
                // 사용자 정보 불일치 시 처리
                log.error("사용자 정보 불일치");
                response.setStatus(HttpServletResponse.SC_UNAUTHORIZED);
                response.getWriter().write("Unauthorized: Token user info does not match.");
            }
        } catch (Exception ex) {
            logger.error("Security Context에 해당 토큰을 등록할 수 없습니다", ex);
            throw new UnAuthorizedException();
        }
    }

//    @Override
    protected void doFilterInternal2(HttpServletRequest request, HttpServletResponse response,
                                    FilterChain filterChain) throws UnAuthorizedException {
        try {
            String jwt = resolveToken(request); //request에서 jwt 토큰을 꺼낸다.
            jwt = jwt != null ? jwt : ""; // 토큰이 없을 경우 빈 문자열 반환

            if ("".equals(jwt)) {
                System.out.println("토큰 없음");
                filterChain.doFilter(request, response);
                return;
            }

            System.out.println("jwt = " + jwt); //test

            if (StringUtils.isNotEmpty(jwt) && jwtService.checkToken(jwt)) {
                Authentication authentication = jwtService.getAuthentication(
                        jwt); // 저장한 authentication 획득

                // Security 세션에서 계속 사용하기 위해 SecurityContext에 Authentication 등록
                SecurityContextHolder.getContext().setAuthentication(authentication);

                // JWT에서 가져온 사용자 정보와 저장한 Authentication의 사용자 정보 비교
                if (isTokenUserInfoMatching(authentication, jwt)) {
                    System.out.println("검증 성공");
                    filterChain.doFilter(request, response); // 사용자 정보가 일치하면 요청 계속 진행
                } else {
                    // 사용자 정보 불일치 시 처리
                    response.setStatus(HttpServletResponse.SC_UNAUTHORIZED);
                    response.getWriter().write("Unauthorized: Token user info does not match.");
                }
            } else {
                if (StringUtils.isEmpty(jwt)) {
                    request.setAttribute("unauthorization", "401 인증키 없음.");
                }

                if (jwtService.checkToken(jwt)) {
                    request.setAttribute("unauthorization", "401-001 인증키 만료.");
                }
            }
        } catch (Exception ex) {
            logger.error("Security Context에 해당 토큰을 등록할 수 없습니다", ex);
            throw new UnAuthorizedException();
        }
//        filterChain.doFilter(request, response);
    }

    private boolean isTokenUserInfoMatching(Authentication authentication, String jwt) {
        String authName = authentication.getName();
        String userId = jwtService.get(jwt).get("userId").toString();
        return authName.equals(userId);
    }

    private String resolveToken(HttpServletRequest request) {
        String bearerToken = request.getHeader("access-token");
        System.out.println("헤더에서 토큰 가져오기 : " + bearerToken);
        if (StringUtils.isNotEmpty(bearerToken) && bearerToken.startsWith("Bearer ")) {
            return bearerToken.substring("Bearer ".length());
        }
        return bearerToken;
    }
}