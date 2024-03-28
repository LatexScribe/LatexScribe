package org.latexscribe.LatexScribe.domain.model;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.RequiredArgsConstructor;
import lombok.Setter;

import java.time.LocalDateTime;

@Entity
@Getter
@Setter
@Table(name = "document")
@RequiredArgsConstructor
public class Document {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String filename;
    private Long filesize;
    @Column(name = "last_modified")
    private LocalDateTime lastModified;
    @Lob
    @Column(name = "file_content")
    private byte[] fileContent;
    @ManyToOne
    @JoinColumn(name = "tag_id")
    private DocumentTag tag;
    @ManyToOne
    @JoinColumn(name = "user_id")
    private User user;
    @ManyToOne
    @JoinColumn(name = "template_id")
    private DocumentTemplate template;
}
