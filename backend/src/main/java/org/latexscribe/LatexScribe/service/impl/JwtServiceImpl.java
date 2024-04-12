package org.latexscribe.LatexScribe.service.impl;

import io.jsonwebtoken.Claims;
import org.latexscribe.LatexScribe.service.IJwtService;
import org.springframework.stereotype.Service;

import java.util.function.Function;

@Service
public class JwtServiceImpl implements IJwtService {
    @Override
    public String extractUsername(String jwt) {
        return "";
    }

    @Override
    public <T> T extractClaim(String token, Function<Claims, T> claimResolver) {
        return null;
    }

    private Claims extract
}
