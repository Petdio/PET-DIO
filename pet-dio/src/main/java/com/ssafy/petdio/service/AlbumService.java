package com.ssafy.petdio.service;

import com.ssafy.petdio.model.dto.AlbumDetailDto;
import com.ssafy.petdio.model.dto.AlbumDto;

import java.util.List;

public interface AlbumService {
    List<AlbumDto> albumList(Long album_user_id);

    AlbumDetailDto albumDetail(Long album_id);

    void AlbumDelete(Long album_id);

}
