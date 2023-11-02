package com.ssafy.petdio.model.entity;


import jakarta.persistence.*;
import lombok.*;

import java.sql.Timestamp;
import org.hibernate.annotations.DynamicInsert;


@Getter
@Setter
@DynamicInsert
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

    @Column(name = "album_imgurl", length = 255, nullable = false)
    private String albumImgUrl;

    @Column(name = "album_created")
    private Timestamp albumCreated;

    @ManyToOne
    @JoinColumn(name = "album_user_id", referencedColumnName = "user_id")
    private User user;

    @ManyToOne
    @JoinColumn(name = "album_concept_id", referencedColumnName = "concept_id")
    private Concept concept;

//----------------------------------------------------------------------------------

}
