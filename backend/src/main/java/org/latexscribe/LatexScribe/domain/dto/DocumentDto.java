package org.latexscribe.LatexScribe.domain.dto;

import org.latexscribe.LatexScribe.domain.model.DocumentTag;
import org.latexscribe.LatexScribe.domain.model.DocumentTemplate;

import java.time.LocalDateTime;

public record DocumentDto(
        String name,

        Long size,

        LocalDateTime lastModified,

        byte[] content,

        DocumentTag tag,

        DocumentTemplate template
) {
}
