package org.latexscribe.LatexScribe.service.impl;

import lombok.AllArgsConstructor;
import org.latexscribe.LatexScribe.domain.dto.DocumentDto;
import org.latexscribe.LatexScribe.domain.model.Document;
import org.latexscribe.LatexScribe.domain.model.DocumentTag;
import org.latexscribe.LatexScribe.domain.model.User;
import org.latexscribe.LatexScribe.repository.DocumentRepository;
import org.latexscribe.LatexScribe.service.IDocumentService;
import org.latexscribe.LatexScribe.service.IUserService;
import org.springframework.http.HttpStatus;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import java.util.List;
import java.util.Optional;

@Service
@AllArgsConstructor
public class DocumentServiceImpl implements IDocumentService {
    final private DocumentRepository documentRepository;
    final private IUserService userService;

    @Override
    public List<Document> findByUser() {
        String username = SecurityContextHolder.getContext().getAuthentication().getName();
        User user = userService.findByUsername(username).orElseThrow(() -> new UsernameNotFoundException(username));

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

        String username = SecurityContextHolder.getContext().getAuthentication().getName();
        User user = userService.findByUsername(username).orElseThrow(() -> new UsernameNotFoundException(username));
        if (user == null) {
            throw new IllegalArgumentException("provided user is null");
        }

        Document document = new Document();
        document.setName(documentDto.name());
        document.setSize(documentDto.size());
        document.setLastModified(documentDto.lastModified());
        document.setContent(documentDto.content());
        document.setTemplate(documentDto.template());
        document.setTag(documentDto.tag());
        document.setUser(user);
        documentRepository.saveAndFlush(document);
    }

    @Override
    public List<Document> findByTag(DocumentTag tag) {
        return documentRepository.findByTag(tag);
    }

    @Override
    public List<Document> findByName(String name) {
        String username = SecurityContextHolder.getContext().getAuthentication().getName();
        User user = userService.findByUsername(username).orElseThrow(() -> new UsernameNotFoundException(username));
        return documentRepository.findByNameContainsIgnoreCaseAndUser(name, user);
    }

    @Override
    public Document update(Long id, DocumentDto documentDto) {
        Optional<Document> document = this.findById(id);
        if (document.isEmpty()) {
            throw new ResponseStatusException(
                    HttpStatus.NOT_FOUND, "document not found"
            );
        }
        document.get().setContent(documentDto.content());
        document.get().setName(documentDto.name());
        document.get().setTag(documentDto.tag());
        document.get().setTemplate(documentDto.template());
        document.get().setSize((long)documentDto.content().length);
        document.get().setLastModified(documentDto.lastModified());

        return documentRepository.saveAndFlush(document.get());
    }
}
