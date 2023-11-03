package com.ssafy.petdio.user.repository;

import com.ssafy.petdio.user.model.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface UserRepository  extends JpaRepository<User, Long> {

    Optional<User> findByUserIdAndUserDeleteIsNull(Long id);

    Optional<User> findByUserEmail(String email);

    Optional<User> findByUserSocialIdAndUserDeleteIsNull(String socialId);

}
