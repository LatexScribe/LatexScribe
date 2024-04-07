package org.latexscribe.LatexScribe.service;

import org.latexscribe.LatexScribe.domain.model.Document;
import org.latexscribe.LatexScribe.domain.model.User;

import java.util.List;
import java.util.Optional;

public interface IDocumentService {
    List<Document> findByUser(User user);
    Optional<Document> findById(Long id);
    void deleteById(Long id);
    void save(Document document);
}
