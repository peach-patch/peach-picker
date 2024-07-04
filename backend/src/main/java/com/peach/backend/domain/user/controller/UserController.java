package com.peach.backend.domain.user.controller;

import com.peach.backend.domain.user.dto.req.SignInReq;
import com.peach.backend.domain.user.dto.req.SignUpReq;
import com.peach.backend.domain.user.dto.resp.SignInResp;
import com.peach.backend.domain.user.facade.UserFacade;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
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
        userFacade.signUp(req);

        return ResponseEntity.ok("회원가입이 완료되었습니다.");
    }

    // TODO
    // 지홍이 구현 예정
    @PostMapping("kakao-sign-up")
    public ResponseEntity<String> signUpWithKakao() {
        return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("구현 중입니다.");
    }

    @PostMapping("sign-in")
    public SignInResp signIn(@RequestBody SignInReq req) {
        return userFacade.signIn(req);
    }

    // TODO
    // 지홍이 구현 예정
    public SignInResp signInWithKakao() {
        return null;
    }

}
