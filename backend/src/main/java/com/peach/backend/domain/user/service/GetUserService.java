package com.peach.backend.domain.user.service;

import com.peach.backend.domain.user.dto.req.SignInReq;
import com.peach.backend.domain.user.dto.resp.ProfileResp;
import com.peach.backend.domain.user.entity.User;
import com.peach.backend.domain.user.entity.repository.UserRepository;
import com.peach.backend.global.util.minio.MinioUtil;
import com.woo.exception.util.BizException;
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
        return userRepository.findUserByEmail(email).orElseThrow(() -> new BizException("user_not_found"));
    }

    public User findUserByEmailAndPassword(SignInReq req) {
        User user = userRepository.findUserByEmailAndIsDeletedFalse(req.getEmail()).orElseThrow(() -> new BizException("login_fail"));
        if(!passwordEncoder.matches(req.getPassword(), user.getPassword())) throw new BizException("login_fail");

        return user;
    }

    public ProfileResp getUserProfileByJwtToken(User user) {
        if(user.getProvider()==null || user.getProvider().isEmpty()) {
            return ProfileResp.builder()
                    .email(user.getEmail())
                    .name(user.getName())
                    .profileUrl(minioUtil.getUrlFromMinioObject(user.getProfileImgUrl()))
                    .build();
        }
        else {
            return ProfileResp.builder()
                    .email(user.getEmail())
                    .name(user.getName())
                    .profileUrl(user.getProfileImgUrl())
                    .build();
        }
    }
}
