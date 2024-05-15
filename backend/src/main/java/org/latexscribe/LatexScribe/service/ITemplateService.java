package org.latexscribe.LatexScribe.service;

import org.latexscribe.LatexScribe.domain.enums.TemplateCategory;
import org.latexscribe.LatexScribe.domain.model.DocumentTemplate;

import java.util.List;
import java.util.Optional;

public interface ITemplateService {
    List<DocumentTemplate> listAll();
    List<DocumentTemplate> listAllByCategory(TemplateCategory category);
    Optional<DocumentTemplate> findById(Long id);
}
