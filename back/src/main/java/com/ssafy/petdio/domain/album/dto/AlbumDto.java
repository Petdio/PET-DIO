package com.ssafy.petdio.domain.album.dto;

import lombok.*;

import java.sql.Timestamp;
import java.util.List;

public class AlbumDto {

    @Getter
    @Setter
    @ToString
    @Builder
    @AllArgsConstructor
    @NoArgsConstructor
    public static class Inventory {
        private String conceptName;
        private boolean realPhotoType;
        private Long conceptId;
        private String path;
        private List<Detail> detail;
    }

    @Getter
    @Setter
    @ToString
    @Builder
    @AllArgsConstructor
    @NoArgsConstructor
    public static class Detail {
        private Long albumId;
        private String albumURL;
        private Timestamp albumCreated;
    }

}

