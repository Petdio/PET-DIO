package com.ssafy.petdio.domain.user.service;

import com.ssafy.petdio.domain.user.model.dto.UserDto;
import com.ssafy.petdio.domain.user.model.dto.UserProfileUpdateDto;
import com.ssafy.petdio.domain.user.model.dto.UserResponseDto;
import com.ssafy.petdio.entity.Enum.Coin;
import jakarta.transaction.Transactional;

public interface UserService {

    public UserDto getUserProfile(Long findUserId, Long myUserId);

    public UserResponseDto updateUserProfile(Long id, UserProfileUpdateDto userProfileUpdateDto);

    public void useCoin(Long id, Coin coin);

    public void deleteUser(Long id);

    @Transactional
    void updateFcmToken(Long userId, String fcmToken);
}
