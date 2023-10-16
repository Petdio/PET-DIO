package com.ssafy.petdio.model.entity;

import com.ssafy.petdio.model.Enum.SocialType;
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
    @GeneratedValue(strategy = GenerationType.AUTO)
    private int id;

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

}
