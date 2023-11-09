package com.ssafy.petdio.auth.jwt.service;

import com.ssafy.petdio.auth.jwt.dto.JwtDto;
import io.jsonwebtoken.Claims;
import org.springframework.security.core.Authentication;

public interface JwtService {

    String createAccessToken(JwtDto jwtDto);

    String createRefreshToken(JwtDto jwtDto);

    String create(JwtDto jwtDto, String subject, long expire);

    Authentication getAuthentication(String key);

    Claims get(String key);

    boolean checkToken(String jwt);

    long getUserIdFromAccessToken(String accessToken);

    public Claims parseClaims(String accessToken);
}