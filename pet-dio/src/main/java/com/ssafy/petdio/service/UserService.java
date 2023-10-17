package com.ssafy.petdio.service;

import com.ssafy.petdio.model.dto.UserProfileUpdateDto;
import com.ssafy.petdio.model.dto.UserResponseDto;

public interface UserService {

    public UserResponseDto getUserProfile(Long id);

    public UserResponseDto updateUserProfile(Long id, UserProfileUpdateDto userProfileUpdateDto);

    public void deleteUser(Long id);


}
