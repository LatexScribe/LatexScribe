package org.latexscribe.LatexScribe.service;

import org.latexscribe.LatexScribe.domain.model.DocumentTag;

import java.util.List;
import java.util.Optional;

public interface ITagService {
    List<DocumentTag> listAll();

    Optional<DocumentTag> findById(Long id);

    Optional<DocumentTag> findByName(String name);

}
