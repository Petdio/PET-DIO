package com.ssafy.petdio.domain.user.service;

import com.ssafy.petdio.domain.user.model.dto.UserDto;
import com.ssafy.petdio.domain.user.model.dto.UserProfileUpdateDto;
import com.ssafy.petdio.domain.user.model.dto.UserResponseDto;
import com.ssafy.petdio.domain.user.model.entity.User;
import com.ssafy.petdio.domain.user.model.mapper.UserMapper;
import com.ssafy.petdio.domain.user.repository.UserRepository;
import com.ssafy.petdio.entity.Enum.Coin;
import jakarta.transaction.Transactional;
import lombok.AllArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

@Service
@Transactional
@AllArgsConstructor
@Slf4j
public class UserServiceImpl implements UserService {
    private final UserRepository userRepository;

    /**
     * 유저 정보 반환하는 메서드
     * @param findUserId, myUserId
     * @return
     */
    @Override
    public UserDto getUserProfile(Long findUserId, Long myUserId) {
        System.out.println(myUserId);
        if(findUserId==null){
            return UserMapper.INSTANCE.entityToUserDto(findUserById(myUserId));
        }

        return UserMapper.INSTANCE.entityToUserDto(findUserById(findUserId));
    }

    /**
     * 유저 프로필을 업데이트 하고 변경 값을 반환하는 로직
     * @param id
     * @param userProfileUpdateDto
     * @return
     */
    @Override
    public UserResponseDto updateUserProfile(Long id, UserProfileUpdateDto userProfileUpdateDto) {
        User user = userRepository.save(findUserById(id).updateUser(userProfileUpdateDto));
        return new UserResponseDto().toUserResponseDto(user);
    }

    /**
     * 코인 사용하는 메서드
     * @param id
     * @return void
     */
    @Override
    public void useCoin(Long id, Coin coin) {
        User user = findUserById(id);
        user.useCoin(coin);
        userRepository.save(user);
    }



    /**
     * 유저 삭제하는 메서드(soft delete)
     * @param id
     * @return
     */
    @Override
    @Transactional
    public void deleteUser(Long id) {
        User user = findUserById(id);
        user.deleted();
        userRepository.saveAndFlush(user);
    }

    // userId로 유저를 찾고, 없으면 throw Exception
    private User findUserById(Long id) {
        return userRepository.findByUserIdAndUserDeleteIsNull(id)
                .orElseThrow(() -> new RuntimeException("해당하는 유저를 찾을 수 없습니다"));
    }

    @Override
    @Transactional
    public void updateFcmToken(Long userId, String fcmToken) {
        findUserById(userId).updateFcmToken(fcmToken);
    }

}
