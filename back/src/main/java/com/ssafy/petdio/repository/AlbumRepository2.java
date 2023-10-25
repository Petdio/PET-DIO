package com.ssafy.petdio.repository;


import com.ssafy.petdio.model.entity.Album;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface AlbumRepository2 extends JpaRepository<Album, Long> {
    void deleteAlbumByAlbumId(Long album_id);
}
