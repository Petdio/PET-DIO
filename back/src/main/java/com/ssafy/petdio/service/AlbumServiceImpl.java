package com.ssafy.petdio.service;


import com.ssafy.petdio.model.dto.AlbumDetailDto;
import com.ssafy.petdio.model.dto.AlbumDto;
import com.ssafy.petdio.model.entity.Album;
import com.ssafy.petdio.repository.AlbumRepository;
import com.ssafy.petdio.repository.AlbumRepository2;
import com.ssafy.petdio.repository.ConceptRepository;
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
    private final AlbumRepository2 albumRepository2;
    private final ConceptRepository conceptRepository;

    @Override
    public List<AlbumDto.Inventory> albumList(Long user_id){
        List<Album> album = albumRepository2.findAllByUser_UserId(user_id);
        return conceptRepository.findByConceptDeleteFalse().stream().map(
                concept -> AlbumDto.Inventory.builder()
                        .conceptId(concept.getConceptId())
                        .conceptName(concept.getConceptName())
                        .detail(album.stream().filter(album1 -> album1.getConcept().getConceptId().equals(concept.getConceptId()))
                                .map(album1 -> AlbumDto.Detail.builder()
                                        .albumId(album1.getAlbumId())
                                        .albumCreated(album1.getAlbumCreated())
                                        .albumURL(album1.getAlbumImgUrl()).build())
                                .collect(Collectors.toList()))
                        .build()).collect(Collectors.toList());
    }
    @Override
    public AlbumDetailDto albumDetail(Long album_id){

        Album albumDetail = albumRepository.AlbumDetail(album_id);

        AlbumDetailDto result = new AlbumDetailDto(albumDetail.getAlbumId(), albumDetail.getAlbumImgUrl(), albumDetail.getConcept().getConceptId(), albumDetail.getAlbumCreated());

        return result;

    }

    @Override
    @Transactional
    public void AlbumDelete(Long album_id){

        albumRepository2.deleteAlbumByAlbumId(album_id);
    }

    //gkgk

}

