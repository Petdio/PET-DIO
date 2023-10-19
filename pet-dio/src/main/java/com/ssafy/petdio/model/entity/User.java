package com.ssafy.petdio.model.entity;

import com.ssafy.petdio.model.dto.UserProfileUpdateDto;
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

    @Column(name = "user_nickname", nullable = false)
    private String userNickname;

    @Column(name = "user_social_type", nullable = false)
    private int userSocialType;

    @Column(name = "user_social_id", nullable = false)
    private String userSocialId;

    @OneToOne(cascade = CascadeType.ALL)
    @JoinColumn(name="user_id")
    private Token token;

    @Column(name = "user_created", columnDefinition = "TIMESTAMP NULL DEFAULT CURRENT_TIMESTAMP")
    private Timestamp userCreated;

    @Column(name = "user_delete", columnDefinition = "TIMESTAMP NULL DEFAULT NULL")
    private Timestamp userDelete;

    @Column(name = "user_token")
    private String userToken;


    public User updateUser(UserProfileUpdateDto userProfileUpdateDto) {
        if (userProfileUpdateDto.getNickname() != null)
            this.userNickname = userProfileUpdateDto.getNickname();
        return this;
    }

    public void deleted() {
        this.userDelete = Timestamp.from(Instant.now());
    }

}
