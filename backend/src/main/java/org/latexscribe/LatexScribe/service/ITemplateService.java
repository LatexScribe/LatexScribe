package org.latexscribe.LatexScribe.service;

import org.latexscribe.LatexScribe.domain.dto.TemplateDto;
import org.latexscribe.LatexScribe.domain.enums.TemplateCategory;
import org.latexscribe.LatexScribe.domain.model.DocumentTemplate;
import org.latexscribe.LatexScribe.domain.model.User;

import java.util.List;
import java.util.Optional;

public interface ITemplateService {
    List<DocumentTemplate> listAll();

    List<DocumentTemplate> listAllByUser(User user);

    List<DocumentTemplate> listAllByCategory(TemplateCategory category);

    Optional<DocumentTemplate> findById(Long id);

    void create(TemplateDto dto);

    void update(Long id, TemplateDto dto);

    void delete(Long id);
}
