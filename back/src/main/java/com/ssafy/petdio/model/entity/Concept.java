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
@Table(name = "concept")
public class Concept {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "concept_id")
    private Long conceptId;

    @Column(name = "concept_name", nullable = false)
    private String conceptName;

    @Column(name = "concept_delete")
    private boolean conceptDelete;

    @Column(name = "concept_img")
    private String conceptImg;

    @Column(name = "concept_path")
    private String conceptPath;
}
