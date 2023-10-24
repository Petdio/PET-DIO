package com.ssafy.petdio.repository;

import com.ssafy.petdio.model.Enum.SocialType;
import com.ssafy.petdio.model.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface UserRepository  extends JpaRepository<User, Long> {

    Optional<User> findByUserIdAndUserDeleteFalse(Long id);

    Optional<User> findByUserEmail(String email);

    Optional<User> findByUserSocialIdAndUserDeleteFalse(String socialId);

}
