package com.ssafy.petdio.domain.concept.service;

import com.ssafy.petdio.domain.concept.dto.ConceptDto;

import java.util.List;

public interface ConceptService {
    List<ConceptDto.Response> getConceptList(boolean concept_type);
}
