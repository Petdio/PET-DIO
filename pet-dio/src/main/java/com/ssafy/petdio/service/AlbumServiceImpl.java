package com.ssafy.petdio.service;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class AlbumServiceImpl implements AlbumService{

    private final AlbumRepository albumRepository;

    @Override
    public List<AlbumDto> albumList(Long album_user_id){
        return albumRepository.AlbumList(album_user_id).stream().map(a -> new AlbumDto(a.getAlbumId(), a.getUser().getUserId(), a.getAlbumImgUrl()))
                .collect(Collectors.toList());
    }
    @Override
    public Album albumDetail(Long album_id){
        return albumRepository.AlbumDetail(album_id);
    }

    //gkgk

}
