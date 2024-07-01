package com.peach.backend.security;

import com.peach.backend.domain.user.entity.User;
import com.peach.backend.domain.user.enums.Role;
import com.peach.backend.domain.user.repository.UserRepository;
import com.peach.backend.global.security.service.JwtValidateService;
import com.peach.backend.global.security.util.JwtProperties;
import com.peach.backend.global.security.util.JwtTokenProvider;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.mockito.Mockito;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.mock.mockito.MockBean;

import java.util.Optional;

import static org.assertj.core.api.Assertions.assertThat;


@SpringBootTest
public class SecurityTest {

    @Autowired
    private JwtTokenProvider jwtTokenProvider;
    @Autowired
    private JwtValidateService jwtValidateService;
    @MockBean
    private UserRepository userRepository;

    @Test
    @DisplayName("jwt 토큰 생성 기능 테스트")
    void createJwtTokenTest() {
        User user = User.builder()
                .email("woo@naver.com")
                .name("최형우")
                .phone("010-0000-0000")
                .role(Role.ADMIN)
                .build();

        String token = jwtTokenProvider.generateAccessToken(user.getEmail());

        assertThat(token).isNotNull();
        assertThat(token).isNotEmpty();
    }

    @Test
    @DisplayName("jwt 토큰 해독 기능 테스트")
    void decodeJwtTokenTest() {
        User user = User.builder()
                .email("woo@naver.com")
                .name("최형우")
                .phone("010-0000-0000")
                .role(Role.ADMIN)
                .build();

        Mockito.when(userRepository.findUserByEmail(user.getEmail())).thenReturn(Optional.of(user));

        String token = jwtTokenProvider.generateAccessToken(user.getEmail());
        String email = jwtValidateService.getUserEmail(token);

        assertThat(email).isEqualTo(user.getEmail());
    }
}
