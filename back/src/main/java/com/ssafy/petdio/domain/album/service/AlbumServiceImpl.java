package com.ssafy.petdio.domain.album.service;

import com.ssafy.petdio.domain.album.dto.AlbumDto;
import com.ssafy.petdio.entity.Album;
import com.ssafy.petdio.domain.album.repository.AlbumRepository;
import com.ssafy.petdio.domain.concept.repository.ConceptRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.stream.Collectors;

@Service
@Transactional(readOnly = true)
@RequiredArgsConstructor
public class AlbumServiceImpl implements AlbumService{
    private final AlbumRepository albumRepository;
    private final ConceptRepository conceptRepository;

    @Value("${cloud.aws.url}")
    private String S3_URL;

    @Override
    public List<AlbumDto.Inventory> albumList(Long user_id){
        List<Album> album = albumRepository.findAllByUser_UserId(user_id);
        return conceptRepository.findByConceptDeleteFalse().stream().map(
                concept -> AlbumDto.Inventory.builder()
                        .realPhotoType(concept.isConceptType())
                        .conceptId(concept.getConceptId())
                        .conceptName(concept.getConceptName())
                        .path(concept.getConceptPath())
                        .detail(album.stream().filter(album1 -> album1.getConcept().getConceptId().equals(concept.getConceptId()))
                                .map(album1 -> AlbumDto.Detail.builder()
                                        .albumId(album1.getAlbumId())
                                        .albumCreated(album1.getAlbumCreated())
                                        .albumURL(S3_URL + album1.getAlbumImgUrl()).build())
                                .collect(Collectors.toList()))
                        .build()).collect(Collectors.toList());
    }

    @Override
    @Transactional
    public void AlbumDelete(Long album_id){
        albumRepository.deleteAlbumByAlbumId(album_id);
    }
}

