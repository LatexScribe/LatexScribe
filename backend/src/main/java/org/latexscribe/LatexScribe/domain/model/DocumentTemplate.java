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
    private String filename;
    private Long filesize;
    @Lob
    @Column(name = "file_content")
    private byte[] fileContent;
    @Column(name = "template_category")
    @Enumerated(value = EnumType.STRING)
    private TemplateCategory templateCategory;
    @ManyToOne
    @JoinColumn(name = "user_id")
    public User user;
}
