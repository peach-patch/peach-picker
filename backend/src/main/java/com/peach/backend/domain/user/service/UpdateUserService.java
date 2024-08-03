package com.peach.backend.domain.user.service;

import com.peach.backend.domain.user.dto.req.ProfileUpdateReq;
import com.peach.backend.domain.user.entity.User;
import com.peach.backend.domain.user.entity.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class UpdateUserService {

    private final UserRepository userRepository;
    private final BCryptPasswordEncoder passwordEncoder;


    public void updateUser(User user, ProfileUpdateReq req) {
        user.updateUserName(req.getName());
        user.updatePassword(passwordEncoder.encode(req.getPassword()));
        userRepository.save(user);
    }


}
