package com.ssafy.petdio.model.Enum;

import lombok.Getter;

@Getter
public enum Coin {
    // 사진 생성
    CREATE_IMAGE(0, 50),
    // 모델 학습
    TRAIN_MODEL(1, 1000);

    private int id;
    private int cost;

    Coin(int id, int cost) {
        this.id = id;
        this.cost = cost;
    }
}
