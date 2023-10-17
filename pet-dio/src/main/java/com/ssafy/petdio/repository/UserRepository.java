package com.ssafy.petdio.repository;

import com.ssafy.petdio.model.Enum.SocialType;
import com.ssafy.petdio.model.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface UserRepository  extends JpaRepository<User, Integer> {

    Optional<User> findByIdAndIsDeleted(Long id, int isDeleted);

    Optional<User> findByEmail(String email);

    Optional<User> findBySocialTyoeAndSocialId(SocialType socialType, String socialId);

}
