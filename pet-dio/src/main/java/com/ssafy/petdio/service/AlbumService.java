package com.ssafy.petdio.service;

import com.ssafy.petdio.model.dto.AlbumDto;
import com.ssafy.petdio.model.entity.Album;

import java.util.List;

public interface AlbumService {
    List<AlbumDto> albumList(Long album_user_id);

    Album albumDetail(Long album_id);
}
