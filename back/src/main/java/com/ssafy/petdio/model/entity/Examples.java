package com.ssafy.petdio.model.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.DynamicInsert;

@Getter
@DynamicInsert
@NoArgsConstructor
@AllArgsConstructor
@Builder
@Entity
@Table(name = "examples")
public class Examples {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "example_id")
    private Long imgId;

    @ManyToOne
    @JoinColumn(name = "example_concept_id", referencedColumnName = "concept_id")
    private Concept concept;

    @Column(name = "example_imgurl", nullable = false)
    private String imgURL;
}
