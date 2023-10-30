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
@Table(name = "setting")
public class Setting {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "setting_id")
    private Long settingId;

    @Column(name = "setting_concept_id")
    private Long settingConceptId;

    @Column(name = "setting_name", length = 100, nullable = false)
    private String settingName;

    @Column(name = "setting_detail", length = 500, nullable = false)
    private String settingDetail;

    @ManyToOne
    @JoinColumn(name = "setting_concept_id", referencedColumnName = "concept_id", insertable = false, updatable = false)
    private Concept concept;
}
