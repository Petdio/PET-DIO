package com.ssafy.petdio.service;


import com.ssafy.petdio.model.dto.AlbumDetailDto;
import com.ssafy.petdio.model.dto.AlbumDto;
import com.ssafy.petdio.model.entity.Album;
import com.ssafy.petdio.repository.AlbumRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.stream.Collectors;

@Service
@Transactional(readOnly = true)
@RequiredArgsConstructor
public class AlbumServiceImpl implements AlbumService{

    private final AlbumRepository albumRepository;

    @Override
    public List<AlbumDto> albumList(Long album_user_id){
        return albumRepository.AlbumList(album_user_id).stream().map(a -> new AlbumDto(a.getAlbumId(), a.getUser().getUserId(), a.getAlbumImgUrl()))
                .collect(Collectors.toList());
    }
    @Override
    public AlbumDetailDto albumDetail(Long album_id){

        Album albumDetail = albumRepository.AlbumDetail(album_id);

        AlbumDetailDto result = new AlbumDetailDto(albumDetail.getAlbumId(), albumDetail.getAlbumImgUrl(), albumDetail.getAlbumConceptId(), albumDetail.getAlbumCreated());

        return result;

    }

    //gkgk

}

