package com.ssafy.petdio.service;

import com.ssafy.petdio.model.dto.ConceptDto;

import java.util.List;

public interface ConceptService {
    List<ConceptDto.Response> getConceptList();
}
