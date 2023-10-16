package com.ssafy.petdio.service;


import com.ssafy.petdio.model.entity.Album;
import com.ssafy.petdio.repository.AlbumRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@Transactional(readOnly = true)
@RequiredArgsConstructor
public class AlbumService {

    private final AlbumRepository albumRepository;

    public List<Album> albumList(Long album_user_id){
        return albumRepository.AlbumList(album_user_id);
    }

    public Album albumDetail(Long album_id){
        return albumRepository.AlbumDetail(album_id);
    }

}

