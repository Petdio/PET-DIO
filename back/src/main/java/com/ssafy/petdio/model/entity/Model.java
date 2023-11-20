package com.ssafy.petdio.model.entity;

import com.ssafy.petdio.user.model.entity.User;
import jakarta.persistence.*;
import jakarta.transaction.Transactional;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.DynamicInsert;

@Getter
@NoArgsConstructor
@AllArgsConstructor
@DynamicInsert
@Builder
@Entity
@Table(name = "model")
public class Model {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "model_id")
    private Long modelId;

    @Column(name = "model_name", nullable = false)
    private String modelName;

    @Column(name = "model_delete")
    private boolean modelDelete;

    @Column(name = "model_dataset_id")
    private String datasetId;

    @Column(name = "model_custom_id")
    private String customModelId;

    @ManyToOne
    @JoinColumn(name = "model_user_id", referencedColumnName = "user_id")
    private User user;

    @Column(name = "model_instance_prompt")
    private String instancePrompt;

    @Column(name = "model_success")
    private boolean success;

    @Transactional
    public void updateSuccess() {
        this.success = true;
    }
}
