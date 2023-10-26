package com.ssafy.petdio.model.dto;

import lombok.*;

import java.util.List;

public class ConceptDto {
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
        private List<String> examples;
        private String path;
    }
}
