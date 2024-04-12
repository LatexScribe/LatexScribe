package org.latexscribe.LatexScribe.service;

import org.latexscribe.LatexScribe.domain.model.User;

import java.util.Optional;

public interface IUserService {
    User save(User user);
    void delete(User user);
    void deleteByUsername(String username);
    Optional<User> findByUsername(String username);
    Optional<User> findByEmail(String email);
}
