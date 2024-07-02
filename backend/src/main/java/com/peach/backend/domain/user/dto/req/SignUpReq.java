package com.peach.backend.domain.user.dto.req;

import com.peach.backend.domain.user.entity.User;
import com.peach.backend.domain.user.dto.enums.Role;
import lombok.Data;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;

@Data
public class SignUpReq {

    private String email;
    private String password;
    private String name;
    private String phone;

    public User toEntity(BCryptPasswordEncoder passwordEncoder) {
        return User.builder()
                .email(email)
                .password(passwordEncoder.encode(password))
                .name(name)
                .phone(phone)
                .role(Role.ADMIN)
                .build();
    }

}
