package com.ssafy.petdio.model.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.sql.Timestamp;

@Getter
@NoArgsConstructor
@AllArgsConstructor
@Builder
@Entity
@Table(name = "user")
public class User {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "user_id")
    private Long userId;

    @Column(name = "user_email", nullable = false)
    private String userEmail;

    @Column(name = "user_nickname", nullable = false)
    private String userNickname;

    @Column(name = "user_social_type", nullable = false)
    private int userSocialType;

    @Column(name = "user_social_id", nullable = false)
    private String userSocialId;

    @Column(name = "user_created", columnDefinition = "TIMESTAMP NULL DEFAULT CURRENT_TIMESTAMP")
    private Timestamp userCreated;

    @Column(name = "user_delete", columnDefinition = "TINYINT(1) NULL DEFAULT '0'")
    private Boolean userDelete;
}
