package org.latexscribe.LatexScribe.domain.model;

import jakarta.persistence.*;
import lombok.*;
import org.latexscribe.LatexScribe.domain.enums.Role;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import java.util.Collection;
import java.util.List;

@Entity
@Getter
@Setter
@Table(name = "auth_user")
@RequiredArgsConstructor
@Builder
@AllArgsConstructor
public class User implements UserDetails {
    @Id
    private String username;

    private String password;

    @Column(name = "full_name")
    private String fullName;

    private String email;

    @Enumerated(EnumType.STRING)
    private Role role;

    @Override
    public String getUsername() {
        return this.username;
    }

    @Override
    public String getPassword() {
        return this.password;
    }

    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {
        return List.of(new SimpleGrantedAuthority(this.role.name()));
    }

    @Override
    public boolean isAccountNonExpired() {
        return true;
    }

    @Override
    public boolean isAccountNonLocked() {
        return true;
    }

    @Override
    public boolean isCredentialsNonExpired() {
        return true;
    }

    @Override
    public boolean isEnabled() {
        return true;
    }
}
