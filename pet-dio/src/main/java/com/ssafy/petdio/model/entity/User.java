package com.ssafy.petdio.model.entity;

import com.ssafy.petdio.model.dto.UserProfileUpdateDto;
import jakarta.persistence.*;
import lombok.*;
import org.hibernate.annotations.DynamicInsert;

import java.sql.Timestamp;

@Getter
@DynamicInsert
@Entity
@Table(name = "user")
@NoArgsConstructor
@AllArgsConstructor
@Builder
@ToString
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

    @Column(name = "user_token")
    private String userToken;


    public User updateUser(UserProfileUpdateDto userProfileUpdateDto) {
        if (userProfileUpdateDto.getNickname() != null)
            this.userNickname = userProfileUpdateDto.getNickname();
        return this;
    }

    public void deleted() {
        this.userDelete = true;
    }

}
