package com.peach.backend.domain.user.controller;

import com.peach.backend.domain.user.dto.req.SignUpReq;
import com.peach.backend.domain.user.facade.UserFacade;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequiredArgsConstructor
@RequestMapping("users")
public class UserController {

    private final UserFacade userFacade;

    @PostMapping("sign-up")
    public ResponseEntity<String> signUp(@RequestBody SignUpReq req) {
        userFacade.createUser(req);

        return ResponseEntity.ok("회원가입이 완료되었습니다.");
    }

}
