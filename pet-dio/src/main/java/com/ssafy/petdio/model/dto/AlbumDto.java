package com.ssafy.petdio.model.dto;

import com.ssafy.petdio.model.entity.User;
import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class AlbumDto {

    private Long album_id;
    private Long album_user_id;
    private String album_imgURL;

}

