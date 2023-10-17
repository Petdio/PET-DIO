package com.ssafy.petdio.model.dto;

import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class AlbumDto {

    private Long album_id;
    private User album_user_id;
    private String album_imgURL;

}

