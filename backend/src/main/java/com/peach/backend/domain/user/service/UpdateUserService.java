package com.peach.backend.domain.user.service;

import com.peach.backend.domain.user.dto.req.ProfileUpdateReq;
import com.peach.backend.domain.user.entity.User;
import com.peach.backend.domain.user.entity.repository.UserRepository;
import com.peach.backend.global.util.minio.MinioUtil;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

@Service
@Slf4j
@RequiredArgsConstructor
public class UpdateUserService {

    private final UserRepository userRepository;
    private final MinioUtil minioUtil;

    public void updateUser(User user, ProfileUpdateReq req) {
        if(req.getProfileImg() != null) {
            String profileImgUrl = "profile-img/" + user.getId() + "/" + req.getProfileImg().getOriginalFilename();
            minioUtil.putObjectToMinio(req.getProfileImg(), profileImgUrl);
            user.updateProfileImgUrl(profileImgUrl);
        }

        user.updateUserName(req.getName());
        userRepository.save(user);
    }


}
