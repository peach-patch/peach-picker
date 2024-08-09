package com.peach.backend.domain.user.entity;

import com.peach.backend.domain.user.enums.Role;
import com.peach.backend.global.entity.BaseTimeEntity;
import jakarta.persistence.*;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.ToString;

import java.time.LocalDateTime;


@NoArgsConstructor
@Getter
@ToString
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
    private LocalDateTime recentLoggedIn;
    private String provider;
    private String providerId;

    @Builder
    public User(String email, String password, String name, Role role, Boolean kakaoSignUp, String profileImgUrl, LocalDateTime RecentLoggedIn, String provider, String providerId) {
        this.email = email;
        this.password = password;
        this.name = name;
        this.role = role;
        this.kakaoSignUp = kakaoSignUp;
        this.profileImgUrl = profileImgUrl;
        this.recentLoggedIn = RecentLoggedIn;
        this.provider = provider;
        this.providerId = providerId;
    }

    public void updateRecentLoggedIn(){
        recentLoggedIn = LocalDateTime.now();
    }

    public void updateUserName(String name){
        this.name = name;
    }
    public void updateProfileImgUrl(String profileImgUrl) {this.profileImgUrl = profileImgUrl;}

    public void updatePassword(String password){
        this.password = password;
    }
}
