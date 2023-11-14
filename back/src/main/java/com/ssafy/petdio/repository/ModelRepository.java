package com.ssafy.petdio.repository;

import com.ssafy.petdio.model.entity.Model;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ModelRepository extends JpaRepository<Model, Long> {

    List<Model> findAllByUser_UserId(Long user_id);

    void deleteModelByModelId(Long model_id);

}
