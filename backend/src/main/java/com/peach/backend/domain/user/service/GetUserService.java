package com.peach.backend.domain.user.service;

import com.peach.backend.domain.user.dto.req.SignInReq;
import com.peach.backend.domain.user.dto.resp.ProfileResp;
import com.peach.backend.domain.user.entity.User;
import com.peach.backend.domain.user.entity.repository.UserRepository;
import com.peach.backend.domain.user.exception.LoginFailException;
import com.peach.backend.domain.user.exception.UserNotFoundException;
import com.peach.backend.global.util.minio.MinioUtil;
import lombok.RequiredArgsConstructor;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class GetUserService {

    private final UserRepository userRepository;
    private final BCryptPasswordEncoder passwordEncoder;
    private final MinioUtil minioUtil;

    public User findUserByEmail(String email) {
        return userRepository.findUserByEmail(email).orElseThrow(() -> UserNotFoundException.EXCEPTION);
    }

    public User findUserByEmailAndPassword(SignInReq req) {
        User user = userRepository.findUserByEmail(req.getEmail()).orElseThrow(() -> LoginFailException.EXCEPTION);
        if(!passwordEncoder.matches(req.getPassword(), user.getPassword())) throw LoginFailException.EXCEPTION;

        return user;
    }

    public ProfileResp getUserProfileByJwtToken(User user) {
        if(!user.getKakaoSignUp()) {
            return ProfileResp.builder()
                    .email(user.getEmail())
                    .name(user.getName())
                    .profileUrl(minioUtil.getUrlFromMinioObject(user.getProfileImgUrl()))
                    .build();
        }
        // TODO
        else {
            return null;
        }
    }
}
