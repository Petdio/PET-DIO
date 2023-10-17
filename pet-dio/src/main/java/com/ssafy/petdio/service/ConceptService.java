package com.ssafy.petdio.service;

import com.ssafy.petdio.model.dto.ConceptDTO;
import org.springframework.stereotype.Service;

import java.util.List;

public interface ConceptService {
    List<ConceptDTO.Response> getConceptList();
}
