package com.ssafy.petdio.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.DynamicInsert;

@Getter
@NoArgsConstructor
@AllArgsConstructor
@DynamicInsert
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

    @Column(name = "concept_type")
    private boolean conceptType;

    public void updateConceptImg(String url) {
        this.conceptImg = url;
    }
}
