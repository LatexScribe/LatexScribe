package org.latexscribe.LatexScribe.service;

import org.latexscribe.LatexScribe.domain.model.Token;

import java.util.List;
import java.util.Optional;

public interface ITokenService {
    Optional<Token> findByToken(String token);
    void save(Token token);
    void saveAll(List<Token> tokens);
    List<Token> findAllValidTokenByUsername(String username);
}
