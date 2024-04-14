package org.latexscribe.LatexScribe.service.impl;

import lombok.RequiredArgsConstructor;
import org.latexscribe.LatexScribe.domain.model.User;
import org.latexscribe.LatexScribe.repository.UserRepository;
import org.latexscribe.LatexScribe.service.IUserService;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
@RequiredArgsConstructor
public class UserServiceImpl implements IUserService  {
    private final UserRepository userRepository;

    @Override
    public User save(User user) {
        if (user == null) {
            throw new IllegalArgumentException("provided user is null");
        }
        return userRepository.saveAndFlush(user);
    }

    @Override
    public void delete(User user) {
        if (user == null) {
            throw new IllegalArgumentException("provided user is null");
        }
        userRepository.delete(user);
    }

    @Override
    public void deleteByUsername(String username) {
        if (username == null) {
            throw new IllegalArgumentException("provided user username is null");
        }
        userRepository.deleteById(username);
    }

    @Override
    public Optional<User> findByUsername(String username) {
        return userRepository.findByUsername(username);
    }

    @Override
    public Optional<User> findByEmail(String email) {
        return userRepository.findByEmail(email);
    }
}
