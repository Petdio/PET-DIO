package com.ssafy.petdio.repository;

import com.ssafy.petdio.model.entity.Img;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ImgRepository extends JpaRepository<Img, Long> {
    String findImgURLByConcept_ConceptIdAndImgType(Long conceptId, int ImgType);
}
