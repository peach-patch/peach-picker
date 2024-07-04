package com.peach.backend.domain.user.service;

import com.peach.backend.domain.user.dto.req.SignInReq;
import com.peach.backend.domain.user.dto.resp.SignInResp;
import com.peach.backend.domain.user.entity.User;
import com.peach.backend.domain.user.entity.repository.UserRepository;
import com.peach.backend.domain.user.exception.LoginFailException;
import com.peach.backend.domain.user.exception.UserNotFoundException;
import lombok.RequiredArgsConstructor;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class GetUserService {

    private final UserRepository userRepository;
    private final BCryptPasswordEncoder passwordEncoder;

    public User findUserByEmail(String email) {
        return userRepository.findUserByEmail(email).orElseThrow(() -> UserNotFoundException.EXCEPTION);
    }

    public User findUserByEmailAndPassword(SignInReq req) {
        User user = userRepository.findUserByEmail(req.getEmail()).orElseThrow(() -> LoginFailException.EXCEPTION);
        if(!passwordEncoder.matches(req.getPassword(), user.getPassword())) throw LoginFailException.EXCEPTION;

        return user;
    }
}
