package com.ssafy.petdio.model.Enum;

import lombok.Getter;

import java.util.HashMap;
import java.util.Map;

@Getter
public enum ConceptModel {


    STICKER_MODEL(1L, "6908bfaf-8cf2-4fda-8c46-03f892d82e06"),

    HALLOWEEN_MODEL(2L, "e316348f-7773-490e-adcd-46757c738eb7"),

    NINJA_MODEL(3L, "ac614f96-1082-45bf-be9d-757f2d31c174"),

    MINI(4L,"e316348f-7773-490e-adcd-46757c738eb7" ),

    CHRISTMAS(5L, "ac614f96-1082-45bf-be9d-757f2d31c174");

    private Long id;
    private String modelId;

    private static final Map<Long, ConceptModel> enumIdMap = new HashMap<>();

    static {
        for (ConceptModel item : ConceptModel.values()) {
            enumIdMap.put(item.getId(), item);
        }
    }
    ConceptModel(Long id, String modelId) {
        this.id = id;
        this.modelId = modelId;

    }

    public static ConceptModel findEnumById(Long id) {
        return enumIdMap.get(id);
    }
}
