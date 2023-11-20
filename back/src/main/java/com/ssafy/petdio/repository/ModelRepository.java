package com.ssafy.petdio.repository;

import com.ssafy.petdio.model.entity.Model;
import java.util.Optional;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ModelRepository extends JpaRepository<Model, Long> {

    Model findByUserUserIdAndModelIdAndSuccessTrue(Long userId, int modelId);

    Optional<Model> findByDatasetId(String modelId);

    List<Model> findByUserUserIdAndSuccessTrue(Long userId);

    void deleteModelByModelId(Long model_id);

}
