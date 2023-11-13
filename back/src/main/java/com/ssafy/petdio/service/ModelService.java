package com.ssafy.petdio.service;

public interface ModelService {

    String makeDataset(String datasetName);

    String trainModel(String modelName, String datasetId, String instancePrompt);

}
