package org.latexscribe.LatexScribe.service.impl;

import lombok.RequiredArgsConstructor;
import org.latexscribe.LatexScribe.domain.model.Token;
import org.latexscribe.LatexScribe.repository.TokenRepository;
import org.latexscribe.LatexScribe.service.ITokenService;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class TokenServiceImpl implements ITokenService {
    private final TokenRepository tokenRepository;

    @Override
    public Optional<Token> findByToken(String token) {
        if (token == null) {
            throw new IllegalArgumentException("provided token is null");
        }
        return tokenRepository.findByToken(token);
    }

    @Override
    public void save(Token token) {
        if (token == null) {
            throw new IllegalArgumentException("provided token is null");
        }
        tokenRepository.saveAndFlush(token);
    }

    @Override
    public void saveAll(List<Token> tokens) {
        if (tokens == null) {
            throw new IllegalArgumentException("provided tokens list is null");
        }
        tokenRepository.saveAllAndFlush(tokens);
    }

    @Override
    public List<Token> findAllValidTokenByUsername(String username) {
        if (username == null) {
            throw new IllegalArgumentException("provided user username is null");
        }
        return tokenRepository.findAllValidTokenByUser_Username(username);
    }
}
