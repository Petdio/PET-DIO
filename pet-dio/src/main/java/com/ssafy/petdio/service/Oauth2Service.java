package com.ssafy.petdio.service;

import com.ssafy.petdio.model.dto.UserDTO;

public interface Oauth2Service {
    UserDTO.LoginResponse kakaoLogin(String code);
}
