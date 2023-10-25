package com.ssafy.petdio.model.dto;

import com.ssafy.petdio.model.entity.User;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.Getter;

import java.sql.Timestamp;

@Data
@AllArgsConstructor
@Getter
public class AlbumDto {

    private Long albumId;
    private Long albumUserId;
    private String albumImgUrl;

}

