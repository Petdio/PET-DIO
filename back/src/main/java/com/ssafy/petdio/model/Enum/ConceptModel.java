package com.ssafy.petdio.model.Enum;

import lombok.Getter;

import java.util.HashMap;
import java.util.Map;

@Getter
public enum ConceptModel {

    //Leonardo Diffusion XL
    STICKER_MODEL(1L, "1e60896f-3c26-4296-8ecc-53e2afecc132"),

    //Leonardo Diffusion XL
    HALLOWEEN_MODEL(2L, "b820ea11-02bf-4652-97ae-9ac0cc00593d"),

    //Leonardo Diffusion
    NINJA_MODEL(3L, "b820ea11-02bf-4652-97ae-9ac0cc00593d"),

    MINI(4L,"e316348f-7773-490e-adcd-46757c738eb7" ),

    //DreamShaper v7
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
