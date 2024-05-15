package org.latexscribe.LatexScribe.domain.model;

import jakarta.persistence.*;
import lombok.*;
import org.latexscribe.LatexScribe.domain.enums.TemplateCategory;

@Entity
@Getter
@Setter
@RequiredArgsConstructor
@Table(name = "document_template")
@Builder
@AllArgsConstructor
public class DocumentTemplate {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String name;

    private Long size;

    // 100MB
    @Column(length = 100000000)
    private byte[] content;

    @Column(name = "template_category")
    @Enumerated(value = EnumType.STRING)
    private TemplateCategory category;

    @Column(name = "code_name")
    private String codeName;

    private String author;
    private String description;
    private String license;
}
