package org.latexscribe.LatexScribe.service.impl;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.google.gson.Gson;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import org.latexscribe.LatexScribe.config.JwtService;
import org.latexscribe.LatexScribe.domain.dto.AuthRequestDto;
import org.latexscribe.LatexScribe.domain.dto.AuthResponseDto;
import org.latexscribe.LatexScribe.domain.dto.RegisterRequestDto;
import org.latexscribe.LatexScribe.domain.enums.Role;
import org.latexscribe.LatexScribe.domain.enums.TokenType;
import org.latexscribe.LatexScribe.domain.model.Token;
import org.latexscribe.LatexScribe.domain.model.User;
import org.latexscribe.LatexScribe.service.IAuthService;
import org.latexscribe.LatexScribe.service.ITokenService;
import org.latexscribe.LatexScribe.service.IUserService;
import org.springframework.http.HttpHeaders;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.io.IOException;
import java.util.Date;

@Service
@RequiredArgsConstructor
public class AuthServiceImpl implements IAuthService {
    private final IUserService userService;
    private final ITokenService tokenService;
    private final PasswordEncoder passwordEncoder;
    private final JwtService jwtService;
    private final AuthenticationManager authenticationManager;

    @Override
    public AuthResponseDto register(RegisterRequestDto request) {
        var user = User.builder()
                .username(request.getUsername())
                .fullName(request.getFullName())
                .email(request.getEmail())
                .password(passwordEncoder.encode(request.getPassword()))
                .role(Role.USER)
                .build();
        var savedUser = userService.save(user);
        var jwtToken = jwtService.generateToken(user);
        var refreshToken = jwtService.generateRefreshToken(user);
        return saveUserToken(savedUser, jwtToken, refreshToken);
    }

    @Override
    public AuthResponseDto authenticate(AuthRequestDto request) {
        authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(
                        request.getUsername(),
                        request.getPassword()
                )
        );
            var user = userService.findByUsername(request.getUsername())
                .orElseThrow();
        var jwtToken = jwtService.generateToken(user);
        var refreshToken = jwtService.generateRefreshToken(user);
        revokeAllUserTokens(user);
        return saveUserToken(user, jwtToken, refreshToken);
    }

    private AuthResponseDto saveUserToken(User user, String jwtToken, String refreshToken) {
        var token = Token.builder()
                .user(user)
                .token(jwtToken)
                .tokenType(TokenType.BEARER)
                .expired(false)
                .revoked(false)
                .build();

        tokenService.save(token);
        return AuthResponseDto.builder()
                .accessToken(jwtToken)
                .accessTokenExpiration(new Date(System.currentTimeMillis() + jwtService.jwtExpiration))
                .refreshToken(refreshToken)
                .refreshTokenExpiration(new Date(System.currentTimeMillis() + jwtService.refreshExpiration))
                .build();
    }

    private void revokeAllUserTokens(User user) {
        var validUserTokens = tokenService.findAllValidTokenByUsername(user.getUsername());
        if (validUserTokens.isEmpty())
            return;
        validUserTokens.forEach(token -> {
            token.setExpired(true);
            token.setRevoked(true);
        });
        tokenService.saveAll(validUserTokens);
    }

    @Override
    public AuthResponseDto refreshToken(
            HttpServletRequest request,
            HttpServletResponse response
    ) {
        final String authHeader = request.getHeader(HttpHeaders.AUTHORIZATION);
        if (authHeader == null ||!authHeader.startsWith("Bearer ")) {
            throw new IllegalArgumentException("Missing Authorization header");
        }

        final String refreshToken = authHeader.substring(7);
        final String username = jwtService.extractUsername(refreshToken);
        if (username == null) {
            throw new IllegalArgumentException("Expected username in JWT token");
        }

        var user = this.userService.findByUsername(username).orElseThrow();
        if (!jwtService.isTokenValid(refreshToken, user)) {
            throw new IllegalArgumentException("JWT refresh token is invalid");
        }

        var accessToken = jwtService.generateToken(user);
        revokeAllUserTokens(user);
        return saveUserToken(user, accessToken, refreshToken);
    }
}
