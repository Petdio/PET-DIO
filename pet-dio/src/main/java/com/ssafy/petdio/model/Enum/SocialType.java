package com.ssafy.petdio.model.Enum;

public enum SocialType {
    kakao(1),
    naver(2);

    private int id;

    SocialType(int id) {
        this.id = id;
    }
}
