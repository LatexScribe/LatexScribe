package org.latexscribe.LatexScribe.service;

import org.latexscribe.LatexScribe.domain.dto.DocumentDto;
import org.latexscribe.LatexScribe.domain.model.Document;
import org.latexscribe.LatexScribe.domain.model.DocumentTag;
import org.latexscribe.LatexScribe.domain.model.User;

import java.util.List;
import java.util.Optional;

public interface IDocumentService {
    List<Document> findByUser();

    Optional<Document> findById(Long id);

    void deleteById(Long id);

    void save(DocumentDto document);

    List<Document> findByTag(DocumentTag tag);

    List<Document> findByName(String name);

    Document update(Long id, DocumentDto documentDto);
}
