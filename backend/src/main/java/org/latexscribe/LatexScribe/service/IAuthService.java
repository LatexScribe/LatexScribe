package org.latexscribe.LatexScribe.service;

import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.latexscribe.LatexScribe.domain.dto.AuthRequestDto;
import org.latexscribe.LatexScribe.domain.dto.AuthResponseDto;
import org.latexscribe.LatexScribe.domain.dto.RegisterRequestDto;
import org.latexscribe.LatexScribe.domain.model.User;

import java.io.IOException;

public interface IAuthService {
    AuthResponseDto register(RegisterRequestDto request);
    AuthResponseDto authenticate(AuthRequestDto request);
    AuthResponseDto refreshToken(
            HttpServletRequest request,
            HttpServletResponse response
    );
}
