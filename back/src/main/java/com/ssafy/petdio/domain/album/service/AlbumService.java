package com.ssafy.petdio.domain.album.service;

import com.ssafy.petdio.domain.album.dto.AlbumDto;

import java.util.List;

public interface AlbumService {
    List<AlbumDto.Inventory> albumList(Long album_user_id);

    void AlbumDelete(Long album_id);
}
