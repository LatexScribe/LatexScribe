package org.latexscribe.LatexScribe.domain.model;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.RequiredArgsConstructor;
import lombok.Setter;
import org.latexscribe.LatexScribe.domain.enums.TemplateCategory;

@Entity
@Getter
@Setter
@RequiredArgsConstructor
@Table(name = "document_template")
public class DocumentTemplate {
    @Id
    private Long id;
    private String name;
    private Long size;
    @Lob
    @Column(name = "content")
    private byte[] content;
    @Column(name = "category")
    @Enumerated(value = EnumType.STRING)
    private TemplateCategory category;
    @ManyToOne
    @JoinColumn(name = "user_id")
    public User user;
}
