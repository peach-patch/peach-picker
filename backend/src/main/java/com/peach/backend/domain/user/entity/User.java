package com.peach.backend.domain.user.entity;

import com.peach.backend.domain.user.enums.Role;
import jakarta.persistence.*;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;


@NoArgsConstructor
@Getter
@Entity
public class User {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private String email;
    private String name;
    private String phone;
    @Enumerated(EnumType.STRING)
    private Role role;

    @Builder
    public User(String email, String name, String phone, Role role) {
        this.email = email;
        this.name = name;
        this.phone = phone;
        this.role = role;
    }
}
