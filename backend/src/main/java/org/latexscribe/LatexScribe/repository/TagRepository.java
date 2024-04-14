package org.latexscribe.LatexScribe.repository;

import org.latexscribe.LatexScribe.domain.model.DocumentTag;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface TagRepository extends JpaRepository<DocumentTag, Long> {
    Optional<DocumentTag> findByName(String name);
}
