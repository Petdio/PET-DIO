package com.ssafy.petdio.model.dto;

import lombok.*;

@Getter
@Setter
@ToString
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class ModelDto {

    private String modelName;
    private String customModelId;
    private String datasetId;
    private Long userId;
    private String instancePrompt;

}
