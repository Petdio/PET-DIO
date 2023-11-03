package com.ssafy.petdio.user.service;

import com.ssafy.petdio.user.model.dto.UserDto;
import com.ssafy.petdio.user.model.dto.UserProfileUpdateDto;
import com.ssafy.petdio.user.model.dto.UserResponseDto;

public interface UserService {

    public UserDto getUserProfile(Long findUserId, Long myUserId);

    public UserResponseDto updateUserProfile(Long id, UserProfileUpdateDto userProfileUpdateDto);

    public void useCoin(Long id);

    public void deleteUser(Long id);

}
