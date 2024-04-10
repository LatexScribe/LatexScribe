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
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String name;

    private Long size;

    @Column
    private byte[] content;

    @Column(name = "template_category")
    @Enumerated(value = EnumType.STRING)
    private TemplateCategory category;

    @ManyToOne
    @JoinColumn(name = "user_id")
    private User user;
}
