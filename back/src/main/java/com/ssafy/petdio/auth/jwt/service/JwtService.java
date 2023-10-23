package com.ssafy.petdio.auth.jwt.service;

public interface JwtService {

    String createAccessToken(JwtDto jwtDto);

    String createRefreshToken(JwtDto jwtDto);

    String create(JwtDto jwtDto, String subject, long expire);

    Authentication getAuthentication(String key);

    Claims get(String key);

    boolean checkToken(String jwt);

    long getMemberIdFromAccessToken(String accessToken);

    public Claims parseClaims(String accessToken);
}