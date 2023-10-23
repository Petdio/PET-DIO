package com.ssafy.petdio.service;

import com.ssafy.petdio.model.dto.UserDto;
import com.ssafy.petdio.model.dto.UserProfileUpdateDto;
import com.ssafy.petdio.model.dto.UserResponseDto;
import com.ssafy.petdio.model.entity.User;

public interface UserService {

    public UserResponseDto getUserProfile(Long id);

    public UserResponseDto updateUserProfile(Long id, UserProfileUpdateDto userProfileUpdateDto);

    public void deleteUser(Long id);

}
