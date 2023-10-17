package com.ssafy.petdio.service;

import com.ssafy.petdio.model.Enum.ImgType;
import com.ssafy.petdio.model.dto.ConceptDTO;
import com.ssafy.petdio.repository.ConceptRepository;
import com.ssafy.petdio.repository.ImgRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
@Slf4j
public class ConceptServiceImpl implements ConceptService{
    private final ConceptRepository conceptRepository;
    private final ImgRepository imgRepository;

    @Override
    public List<ConceptDTO.Response> getConceptList() {
        return conceptRepository
                .findByConceptDeleteFalse()
                .stream()
                .map(concept -> ConceptDTO.Response.builder()
                        .id(concept.getConceptId())
                        .name(concept.getConceptName())
                        .imgURL(imgRepository.findImgURLByConcept_ConceptIdAndImgType(concept.getConceptId(), ImgType.list.ordinal()))
                        .build())
                .collect(Collectors.toList());
    }
}
