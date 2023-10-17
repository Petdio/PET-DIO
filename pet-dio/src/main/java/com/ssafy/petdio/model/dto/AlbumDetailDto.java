package com.ssafy.petdio.model.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.Getter;

import java.sql.Timestamp;

@Data
@AllArgsConstructor
@Getter
public class AlbumDetailDto {

    private Long albumId;
    private String albumImgUrl;
    private Long albumConceptId;
    private Timestamp albumCreated;

}
