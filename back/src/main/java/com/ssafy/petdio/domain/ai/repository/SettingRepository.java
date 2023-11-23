package com.ssafy.petdio.domain.ai.repository;

import com.ssafy.petdio.entity.Setting;
import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface SettingRepository extends JpaRepository<Setting, Long> {
    List<Setting> findAllByConcept_ConceptId(Long conceptId);
}
