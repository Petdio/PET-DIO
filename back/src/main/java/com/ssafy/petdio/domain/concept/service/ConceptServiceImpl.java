package com.ssafy.petdio.domain.concept.service;

import com.ssafy.petdio.domain.concept.dto.ConceptDto;
import com.ssafy.petdio.domain.concept.repository.ConceptRepository;
import com.ssafy.petdio.domain.concept.repository.ExamplesRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
@Slf4j
public class ConceptServiceImpl implements ConceptService{
    @Value("${cloud.aws.url}")
    private String defaultUrl;
    private final ConceptRepository conceptRepository;
    private final ExamplesRepository examplesRepository;

    @Override
    public List<ConceptDto.Response> getConceptList(boolean concept_type) {
        return (concept_type ? conceptRepository.findByConceptDeleteFalseAndConceptTypeTrue() : conceptRepository.findByConceptDeleteFalseAndConceptTypeFalse())
                .stream()
                .map(concept -> ConceptDto.Response.builder()
                        .id(concept.getConceptId())
                        .name(concept.getConceptName())
                        .imgURL(defaultUrl + concept.getConceptImg())
                        .path(concept.getConceptPath())
                        .examples(examplesRepository.findImgURLsByConceptId(concept.getConceptId()).stream().map(s -> defaultUrl + s).collect(Collectors.toList()))
                        .build())
                .collect(Collectors.toList());
    }
}
