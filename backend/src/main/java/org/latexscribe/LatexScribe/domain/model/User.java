package org.latexscribe.LatexScribe.domain.model;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.RequiredArgsConstructor;
import lombok.Setter;

@Entity
@Getter
@Setter
@Table(name = "auth_user")
@RequiredArgsConstructor
public class User {
    @Id
    private String username;
    private String password;
    @Column(name = "full_name")
    private String fullName;
    private String email;
}
