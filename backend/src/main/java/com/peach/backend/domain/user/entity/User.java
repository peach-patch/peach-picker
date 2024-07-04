package com.peach.backend.domain.user.entity;

import com.peach.backend.domain.user.enums.Role;
import com.peach.backend.global.entity.BaseTimeEntity;
import jakarta.persistence.*;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.ColumnDefault;


@NoArgsConstructor
@Getter
@Entity
public class User extends BaseTimeEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private String email;
    @Column(nullable = false)
    private String password;
    private String name;
    @Enumerated(EnumType.STRING)
    private Role role;
    private Boolean kakaoSignUp;
    private String profileImgUrl;

    @Builder
    public User(String email, String password, String name, Role role, Boolean kakaoSignUp, String profileImgUrl) {
        this.email = email;
        this.password = password;
        this.name = name;
        this.role = role;
        this.kakaoSignUp = kakaoSignUp;
        this.profileImgUrl = profileImgUrl;
    }
}
