package com.ssafy.petdio.model.entity;


import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.sql.Timestamp;


@Getter
@NoArgsConstructor
@AllArgsConstructor
@Builder
@Entity
@Table(name = "album")
public class Album {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "album_id")
    private Long albumId;

    @Column(name = "album_user_id", nullable = false)
    private Long albumUserId;

    @Column(name = "album_concept_id", nullable = false)
    private Long albumConceptId;

    @Column(name = "album_imgurl", nullable = false)
    private String albumImgUrl;

    @Column(name = "album_created", columnDefinition = "TIMESTAMP NULL DEFAULT CURRENT_TIMESTAMP")
    private Timestamp albumCreated;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "album_user_id", insertable = false, updatable = false)
    private User user;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "album_concept_id", insertable = false, updatable = false)
    private Concept concept;
}
