package com.ssafy.petdio.repository;

import com.ssafy.petdio.model.entity.Examples;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;
import org.springframework.stereotype.Repository;

@Repository
public interface ExamplesRepository extends JpaRepository<Examples, Long> {
    @Query("SELECT e.imgURL FROM Examples e WHERE e.concept.conceptId = :conceptId")
    List<String> findImgURLsByConceptId(@Param("conceptId") Long conceptId);
}
