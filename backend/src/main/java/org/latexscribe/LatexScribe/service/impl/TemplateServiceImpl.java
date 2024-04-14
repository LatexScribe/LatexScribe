package org.latexscribe.LatexScribe.service.impl;

import lombok.RequiredArgsConstructor;
import org.latexscribe.LatexScribe.domain.dto.TemplateDto;
import org.latexscribe.LatexScribe.domain.enums.TemplateCategory;
import org.latexscribe.LatexScribe.domain.model.DocumentTemplate;
import org.latexscribe.LatexScribe.domain.model.User;
import org.latexscribe.LatexScribe.repository.TemplateRepository;
import org.latexscribe.LatexScribe.service.ITemplateService;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.NoSuchElementException;
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
    public List<DocumentTemplate> listAllByUser(User user) {
        if (user == null) {
            throw new IllegalArgumentException("provided user is null");
        }
        return templateRepository.findByUser(user);
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

    @Override
    public void create(TemplateDto dto) {
        DocumentTemplate template = new DocumentTemplate();
        template.setName(dto.name());
        template.setSize(dto.size());
        template.setContent(dto.content());
        template.setCategory(dto.category());
        template.setUser(dto.user());
        templateRepository.saveAndFlush(template);
    }

    @Override
    public void update(Long id, TemplateDto dto) {
        if (dto == null) {
            throw new IllegalArgumentException("provided template must not be null");
        }
        if (findById(id).isEmpty()) {
            throw new NoSuchElementException("template with id " + id + " does not exist");
        }
        DocumentTemplate template = findById(id).get();
        template.setName(dto.name());
        template.setSize(dto.size());
        template.setContent(dto.content());
        template.setCategory(dto.category());
        template.setUser(dto.user());
        templateRepository.saveAndFlush(template);
    }

    @Override
    public void delete(Long id) {
        if (id == null) {
            throw new IllegalArgumentException("provided id is null");
        }
        templateRepository.deleteById(id);
    }
}
