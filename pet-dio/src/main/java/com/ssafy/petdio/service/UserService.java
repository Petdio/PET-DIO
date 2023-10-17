package com.ssafy.petdio.service;

import com.ssafy.petdio.model.dto.UserProfileUpdateDto;
import com.ssafy.petdio.model.dto.UserResponseDto;

public interface UserService {

    public UserResponseDto getUserProfile(int id);

    public UserResponseDto updateUserProfile(int id, UserProfileUpdateDto userProfileUpdateDto);

    public void deleteUser(int id);


}
