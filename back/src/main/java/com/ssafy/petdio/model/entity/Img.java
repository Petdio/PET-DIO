package com.ssafy.petdio.model.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor
@AllArgsConstructor
@Builder
@Entity
@Table(name = "img")
public class Img {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "img_id")
    private Long imgId;

    @ManyToOne
    @JoinColumn(name = "img_concept_id", referencedColumnName = "concept_id")
    private Concept concept;

    @Column(name = "img_type", nullable = false)
    private int imgType;

    @Column(name = "img_imgURL", nullable = false)
    private String imgURL;
}
