package org.latexscribe.LatexScribe.service.impl;

import lombok.AllArgsConstructor;
import org.latexscribe.LatexScribe.domain.dto.DocumentDto;
import org.latexscribe.LatexScribe.domain.model.Document;
import org.latexscribe.LatexScribe.domain.model.DocumentTag;
import org.latexscribe.LatexScribe.domain.model.User;
import org.latexscribe.LatexScribe.repository.DocumentRepository;
import org.latexscribe.LatexScribe.service.IDocumentService;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
@AllArgsConstructor
public class DocumentServiceImpl implements IDocumentService {
    final private DocumentRepository documentRepository;

    @Override
    public List<Document> findByUser(User user) {
        if (user == null) {
            throw new IllegalArgumentException("provided user is null");
        }
        return documentRepository.findByUser(user);
    }

    @Override
    public Optional<Document> findById(Long id) {
        if (id == null) {
            throw new IllegalArgumentException("provided id is null");
        }
        return documentRepository.findById(id);
    }

    @Override
    public void deleteById(Long id) {
        if (id == null) {
            throw new IllegalArgumentException("provided id is null");
        }
        documentRepository.deleteById(id);
    }

    @Override
    public void save(DocumentDto documentDto) {
        if (documentDto == null) {
            throw new IllegalArgumentException("provided document must not be null");
        }
        Document document = new Document();
        document.setName(documentDto.name());
        document.setSize(documentDto.size());
        document.setLastModified(documentDto.lastModified());
        document.setContent(documentDto.content());
        document.setTemplate(documentDto.template());
        document.setTag(documentDto.tag());
        documentRepository.saveAndFlush(document);
    }

    @Override
    public List<Document> findByTag(DocumentTag tag) {
        return documentRepository.findByTag(tag);
    }

    @Override
    public List<Document> findByName(String name) {
        return documentRepository.findByNameContainsIgnoreCase(name);
    }
}
