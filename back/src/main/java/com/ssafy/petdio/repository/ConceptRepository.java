package com.ssafy.petdio.repository;

import com.ssafy.petdio.model.entity.Concept;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface ConceptRepository extends JpaRepository<Concept, Long> {
    List<Concept> findByConceptDeleteFalse();
}