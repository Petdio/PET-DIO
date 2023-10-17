package com.ssafy.petdio.model.dto;

import lombok.*;

public class ConceptDTO {
    @Getter
    @Setter
    @ToString
    @Builder
    @AllArgsConstructor
    @NoArgsConstructor
    public static class Response {
        private String name;
        private Long id;
        private String imgURL;
    }
}
