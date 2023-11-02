package com.ssafy.petdio.service;

import com.ssafy.petdio.model.dto.AlbumDto;

import java.util.List;

public interface AlbumService {
    List<AlbumDto.Inventory> albumList(Long album_user_id);

    void AlbumDelete(Long album_id);

}
