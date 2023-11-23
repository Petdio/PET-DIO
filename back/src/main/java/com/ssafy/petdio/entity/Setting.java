package com.ssafy.petdio.entity;

import com.ssafy.petdio.entity.Concept;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.ToString;

@Getter
@NoArgsConstructor
@AllArgsConstructor
@Builder
@Entity
@ToString
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

    @Column(name = "setting_type", length = 500, nullable = false)
    private String settingType;

    @ManyToOne
    @JoinColumn(name = "setting_concept_id", referencedColumnName = "concept_id", insertable = false, updatable = false)
    private Concept concept;
}
