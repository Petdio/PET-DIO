package com.ssafy.petdio.model.Enum;

import lombok.Getter;

@Getter
public enum ImgType {
    list(1, "컨셉 리스트 사진");

    private int typeId;
    private String typeName;


    ImgType(int typeId, String typeName) {
        this.typeId = typeId;
        this.typeName = typeName;
    }
}
