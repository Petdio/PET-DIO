package com.ssafy.petdio.domain.model.dto;

import java.sql.Timestamp;
import lombok.*;

public class ModelDto {
    @Getter
    @Setter
    @ToString
    @Builder
    @AllArgsConstructor
    @NoArgsConstructor
    public static class Response {
        private Long modelId;
        private String modelName;
    }

}
