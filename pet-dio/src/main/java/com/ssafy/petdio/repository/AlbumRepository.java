package com.ssafy.petdio.repository;

import com.ssafy.petdio.model.entity.Album;
import jakarta.persistence.EntityManager;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
@RequiredArgsConstructor
public class AlbumRepository {

    private final EntityManager em;
    public Album AlbumDetail(Long id){
        return em.find(Album.class, id);
    }

    public List<Album> AlbumList(Long album_user_id){
        return em.createQuery("select a from Album a where a.user.userId = :album_user_id", Album.class)
                .setParameter("album_user_id", album_user_id )
                .getResultList();
    }

    //gkgk

}
