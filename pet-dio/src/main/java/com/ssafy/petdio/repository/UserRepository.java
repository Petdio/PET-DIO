package com.ssafy.petdio.repository;

import com.ssafy.petdio.model.Enum.SocialType;
import com.ssafy.petdio.model.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface UserRepository  extends JpaRepository<User, Integer> {

    Optional<User> findByIdAndDelete(Long id, boolean delete);

    Optional<User> findByEmail(String email);

    Optional<User> findBySocialTyoeAndSocialId(SocialType socialType, String socialId);

}
