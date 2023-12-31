package com.ssafy.petdio.domain.album.repository;


import com.ssafy.petdio.entity.Album;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

import org.springframework.stereotype.Repository;

@Repository
public interface AlbumRepository extends JpaRepository<Album, Long> {
    void deleteAlbumByAlbumId(Long album_id);

    List<Album> findAllByUser_UserId(Long user_id);
}
