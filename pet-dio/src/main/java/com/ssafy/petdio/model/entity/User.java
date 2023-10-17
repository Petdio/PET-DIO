package com.ssafy.petdio.model.entity;

import com.ssafy.petdio.model.Enum.SocialType;
import com.ssafy.petdio.model.dto.UserProfileUpdateDto;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Getter
@Entity
@Table(name = "user")
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class User {

    @Id
    @Column(name = "user_id", nullable = false)
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "user_email", nullable = false)
    private String email;

    @Column(name = "user_nickname", nullable = false)
    private String nickname;

    @Column(name = "user_socialType", nullable = false)
    private SocialType socialType;

    @Column(name = "user_socialId", nullable = false)
    private String socialId;

    @Column(name = "user_createdAt")
    private LocalDateTime createdAt;

    @Column(name = "user_isDelete")
    private int isDeleted;

    public User updateUser(UserProfileUpdateDto userProfileUpdateDto) {
        if (userProfileUpdateDto.getNickname() != null)
            this.nickname = userProfileUpdateDto.getNickname();
        return this;
    }

    public void deleted() {
        this.isDeleted = 1;
    }

}
