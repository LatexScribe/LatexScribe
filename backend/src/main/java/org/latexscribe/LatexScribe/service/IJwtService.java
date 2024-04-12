package org.latexscribe.LatexScribe.service;

import io.jsonwebtoken.Claims;

import java.util.function.Function;

public interface IJwtService {
    String extractUsername(String token);

    public <T> T extractClaim(String token, Function<Claims, T> claimResolver);
}
