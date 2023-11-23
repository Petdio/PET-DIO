package com.ssafy.petdio.domain.concept.repository;

import com.ssafy.petdio.entity.Concept;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import org.springframework.stereotype.Repository;

@Repository
public interface ConceptRepository extends JpaRepository<Concept, Long> {
    List<Concept> findByConceptDeleteFalse();
    List<Concept> findByConceptDeleteFalseAndConceptTypeFalse();

    List<Concept> findByConceptDeleteFalseAndConceptTypeTrue();
    Concept findByConceptDeleteFalseAndConceptId(Long conceptId);
}