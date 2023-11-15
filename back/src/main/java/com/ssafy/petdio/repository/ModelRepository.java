package com.ssafy.petdio.repository;

import com.ssafy.petdio.model.entity.Model;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ModelRepository extends JpaRepository<Model, Long> {

    Model findByUserUserIdAndModelId(Long userId, int modelId);

    List<Model> findByUserUserId(Long userId);

    void deleteModelByModelId(Long model_id);

}
