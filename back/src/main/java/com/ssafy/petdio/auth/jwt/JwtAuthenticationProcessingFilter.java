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
        // "/ai/webhook" 경로에 대한 요청은 검증하지 않음
        if ("/ai/webhook".equals(request.getServletPath()) || "/actuator/prometheus".equals(request.getServletPath())) {
            try {
                filterChain.doFilter(request, response);
            } catch (Exception ex) {
                logger.error("Could not process the request", ex);
                throw new UnAuthorizedException();
            }
            return;
        }
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
                filterChain.doFilter(request, response);
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

    private boolean isTokenUserInfoMatching(Authentication authentication, String jwt) {
        String authName = authentication.getName();
        String userId = jwtService.get(jwt).get("userId").toString();
        return authName.equals(userId);
    }

//    private String resolveToken(HttpServletRequest request) {
//        String bearerToken = request.getHeader("access-token");
//        System.out.println("헤더에서 토큰 가져오기 : " + bearerToken);
//        if (StringUtils.isNotEmpty(bearerToken) && bearerToken.startsWith("Bearer ")) {
//            return bearerToken.substring("Bearer ".length());
//        }
//        return bearerToken;
//    }
}