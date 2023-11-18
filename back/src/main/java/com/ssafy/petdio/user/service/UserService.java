package com.ssafy.petdio.user.service;

import com.ssafy.petdio.model.Enum.Coin;
import com.ssafy.petdio.user.model.dto.UserDto;
import com.ssafy.petdio.user.model.dto.UserProfileUpdateDto;
import com.ssafy.petdio.user.model.dto.UserResponseDto;
import jakarta.transaction.Transactional;

public interface UserService {

    public UserDto getUserProfile(Long findUserId, Long myUserId);

    public UserResponseDto updateUserProfile(Long id, UserProfileUpdateDto userProfileUpdateDto);

    public void useCoin(Long id, Coin coin);

    public void deleteUser(Long id);

    @Transactional
    void updateFcmToken(Long userId, String fcmToken);
}
