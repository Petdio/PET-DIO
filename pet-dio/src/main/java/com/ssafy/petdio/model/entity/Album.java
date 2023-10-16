package com.ssafy.petdio.model.entity;


import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

import java.time.ZonedDateTime;
import java.util.ArrayList;
import java.util.List;

import static jakarta.persistence.FetchType.LAZY;


@Entity
@Getter
@Setter
public class Album {

    @Id
    @GeneratedValue
    private Long album_id;

    @OneToMany(fetch = LAZY)
    @JoinColumn(name = "user_id")
    private User album_user_id;

    @ManyToOne(fetch = LAZY)
    @JoinColumn(name = "concept_id")
    private Concept album_concept_id;

    private String album_imgURL;

    private ZonedDateTime createdat;

    //gkgk

}
