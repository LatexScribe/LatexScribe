package org.latexscribe.LatexScribe.service.impl;

import lombok.RequiredArgsConstructor;
import org.latexscribe.LatexScribe.domain.enums.TemplateCategory;
import org.latexscribe.LatexScribe.domain.model.DocumentTemplate;
import org.latexscribe.LatexScribe.repository.TemplateRepository;
import org.latexscribe.LatexScribe.service.ITemplateService;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class TemplateServiceImpl implements ITemplateService {
    private final TemplateRepository templateRepository;

    @Override
    public List<DocumentTemplate> listAll() {
        return templateRepository.findAll();
    }

    @Override
    public List<DocumentTemplate> listAllByCategory(TemplateCategory category) {
        if (category == null) {
            throw new IllegalArgumentException("category is null");
        }
        return templateRepository.findByCategory(category);
    }

    @Override
    public Optional<DocumentTemplate> findById(Long id) {
        if (id == null) {
            throw new IllegalArgumentException("provided id is null");
        }
        return templateRepository.findById(id);
    }
}
