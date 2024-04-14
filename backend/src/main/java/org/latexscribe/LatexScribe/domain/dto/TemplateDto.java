package org.latexscribe.LatexScribe.domain.dto;


import org.latexscribe.LatexScribe.domain.enums.TemplateCategory;
import org.latexscribe.LatexScribe.domain.model.User;

public record TemplateDto(
        String name,

        Long size,

        byte[] content,

        TemplateCategory category,

        User user
) {
}
