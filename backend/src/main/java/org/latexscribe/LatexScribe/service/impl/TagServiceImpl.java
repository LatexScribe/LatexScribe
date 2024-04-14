package org.latexscribe.LatexScribe.service.impl;

import lombok.RequiredArgsConstructor;
import org.latexscribe.LatexScribe.domain.model.DocumentTag;
import org.latexscribe.LatexScribe.repository.TagRepository;
import org.latexscribe.LatexScribe.service.ITagService;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class TagServiceImpl implements ITagService {
    private final TagRepository tagRepository;

    @Override
    public List<DocumentTag> listAll() {
        return tagRepository.findAll();
    }

    @Override
    public Optional<DocumentTag> findById(Long id) {
        return tagRepository.findById(id);
    }

    @Override
    public Optional<DocumentTag> findByName(String name) {
        return tagRepository.findByName(name);
    }
}
