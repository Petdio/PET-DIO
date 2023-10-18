package com.ssafy.petdio.model.Enum;

import lombok.Getter;

@Getter
public enum SocialType {
    kakao(1),
    naver(2);

    private int id;

    SocialType(int id) {
        this.id = id;
    }
}
