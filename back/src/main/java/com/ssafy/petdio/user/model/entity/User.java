package com.ssafy.petdio.user.model.entity;

import com.ssafy.petdio.model.Enum.Role;
import com.ssafy.petdio.model.Enum.SocialType;
import com.ssafy.petdio.user.model.dto.UserProfileUpdateDto;
import jakarta.persistence.*;
import lombok.*;
import org.hibernate.annotations.DynamicInsert;

import java.sql.Timestamp;
import java.time.Instant;

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

    @Column(name = "user_coin", nullable = false)
    private int userCoin;

    @Column(name = "user_nickname", nullable = false)
    private String userNickname;

    @Column(name = "profile_image", nullable = false)
    private String profileImage;

    @Enumerated(EnumType.STRING)
    @Column(name = "role", nullable = false)
    private Role role;

    @Column(name = "user_fcmtoken")
    private String fcmToken;

    @Enumerated(EnumType.STRING)
    @Column(name = "user_social_type", nullable = false)
    private SocialType userSocialType;

    @Column(name = "user_social_id", nullable = false)
    private String userSocialId;

    @Column(name = "user_created", columnDefinition = "TIMESTAMP NULL DEFAULT CURRENT_TIMESTAMP")
    private Timestamp userCreated;

    @Column(name = "user_delete", columnDefinition = "TIMESTAMP NULL DEFAULT NULL")
    private Timestamp userDelete;

    @Builder
    public User(String userNickname, String userEmail, int coin, String fcmToken, SocialType userSocialType, String userSocialId){
        this.userNickname = userNickname == null ? "별명" : userNickname;
        this.userEmail = userEmail == null ? "이메일" : userEmail;
        this.userCoin = coin;
        this.fcmToken = fcmToken;
        this.userSocialType = userSocialType;
        this.userSocialId = userSocialId;
        this.role = Role.USER;
    }

    // 코인 사용
    public void useCoin(){
        // 1회 이미지 생성 시 소비되는 코인
        int coinPerImage = 50;
        this.userCoin -= coinPerImage;
    }

    public User updateUser(UserProfileUpdateDto userProfileUpdateDto) {
        if (userProfileUpdateDto.getNickname() != null)
            this.userNickname = userProfileUpdateDto.getNickname();
        return this;
    }

    public void deleted() {
        this.userDelete = Timestamp.from(Instant.now());
    }

    public void updateFcmToken(String fcmToken) {
        if (fcmToken.equals("")) {
            this.fcmToken = null;
            return;
        }
        this.fcmToken = fcmToken;
    }

}
