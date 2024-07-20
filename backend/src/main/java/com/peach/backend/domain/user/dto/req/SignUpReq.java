package com.peach.backend.domain.user.dto.req;

import com.peach.backend.domain.user.entity.User;
import com.peach.backend.domain.user.enums.Role;
import lombok.Data;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;

@Data
public class SignUpReq {

    private String email;
    private String password;
    private String name;

    public User toEntity(BCryptPasswordEncoder passwordEncoder) {
        return User.builder()
                .email(email)
                .password(passwordEncoder.encode(password))
                .name(name)
                .role(Role.ADMIN)
                .kakaoSignUp(false)
                .profileImgUrl("profile-img/default_profile.png")
                .build();
    }

}
