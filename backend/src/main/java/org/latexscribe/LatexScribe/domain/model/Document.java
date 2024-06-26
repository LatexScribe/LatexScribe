package org.latexscribe.LatexScribe.domain.model;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonProperty;
import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDateTime;

@Entity
@Getter
@Setter
@Table(name = "document")
@RequiredArgsConstructor
@Builder
@AllArgsConstructor
public class Document {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @JsonProperty
    private Long id;

    @JsonProperty
    private String name;

    @JsonProperty
    private Long size;

    @Column(name = "last_modified")
    @JsonProperty
    private LocalDateTime lastModified;

    @Column(length = 100000000)
    @JsonProperty
    private byte[] content;

    @ManyToOne
    @JoinColumn(name = "tag_id")
    @JsonProperty("tag")
    private DocumentTag tag;

    @ManyToOne
    @JoinColumn(name = "user_id")
    @JsonIgnore
    private User user;

    @ManyToOne
    @JoinColumn(name = "template_id")
    @JsonProperty
    private DocumentTemplate template;
}
