package com.peach.backend.user;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.peach.backend.domain.user.dto.req.SignUpReq;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

@SpringBootTest
public class UserTest {

    @Autowired
    private ObjectMapper mapper;

//    @Test
//    @DisplayName("회원 가입 테스트")
//    void signUp() {
//        String email = "woo@naver.com";
//        String password = "password";
//        String name = "최형우";
//        String phone = "010-0000-0000";
//
//        String body = mapper.writeValueAsString(
//                PostsSaveRequestDto.builder().author(author).content(content).title(title).build()
//        );
//    }

}
