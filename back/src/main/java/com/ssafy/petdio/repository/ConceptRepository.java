package com.ssafy.petdio.repository;

import com.ssafy.petdio.model.entity.Concept;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import org.springframework.stereotype.Repository;

@Repository
public interface ConceptRepository extends JpaRepository<Concept, Long> {
    List<Concept> findByConceptDeleteFalseAndConceptType(boolean concept_type);
    Concept findByConceptDeleteFalseAndConceptId(Long conceptId);
}