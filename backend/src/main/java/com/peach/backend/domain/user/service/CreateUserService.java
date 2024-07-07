package com.peach.backend.domain.user.service;

import com.peach.backend.domain.user.dto.req.SignUpReq;
import com.peach.backend.domain.user.entity.repository.UserRepository;
import com.peach.backend.domain.user.exception.UserAlreadyExistException;
import lombok.RequiredArgsConstructor;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class CreateUserService {

    private final UserRepository userRepository;
    private final BCryptPasswordEncoder passwordEncoder;


    public void createUser(final SignUpReq req) {
        if (duplicateEmailCheck(req.getEmail())) throw UserAlreadyExistException.EXCEPTION;

        userRepository.save(req.toEntity(passwordEncoder));
    }


    private Boolean duplicateEmailCheck(String email) {
        return userRepository.existsByEmail(email);
    }

}
