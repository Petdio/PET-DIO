package com.ssafy.petdio.repository;

import com.ssafy.petdio.model.entity.Setting;
import java.util.List;
import java.util.Map;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

@Repository
public interface SettingRepository extends JpaRepository<Setting, Long> {
//    List<Setting> findAllByConcept_ConceptId(Long conceptId);
    @Query("SELECT new map(s.settingName as key, s.settingDetail as value) FROM Setting s WHERE s.concept.conceptId = :conceptId")
    Map<String, String> findSettingNameAndDetailByConceptId(Long conceptId);
}
