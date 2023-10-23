package com.ssafy.petdio.model.Enum;

public enum ConceptType {
    wedding(1, "웨딩");

    private int id;
    private String name;


    ConceptType(int id, String name) {
        this.id = id;
        this.name = name;
    }
}
