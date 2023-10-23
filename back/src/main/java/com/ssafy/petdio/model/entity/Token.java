package com.ssafy.petdio.model.entity;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;


import java.sql.Timestamp;

@Getter
@Entity
@Table(name = "token")
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class Token {

    @Id
    @Column(name = "token_user_id")
    private Long tokenUserId;

    @Column(name = "token_refresh")
    private String tokenRefresh;

    @Column(name = "token_date")
    private Timestamp tokenDate;

}
