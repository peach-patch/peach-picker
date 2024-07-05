package com.peach.backend.domain.user.controller;

import com.peach.backend.domain.user.dto.req.SignInReq;
import com.peach.backend.domain.user.dto.req.SignUpReq;
import com.peach.backend.domain.user.dto.resp.ProfileResp;
import com.peach.backend.domain.user.dto.resp.SignInResp;
import com.peach.backend.domain.user.entity.User;
import com.peach.backend.domain.user.facade.UserFacade;
import com.peach.backend.global.security.dto.CurrentUser;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequiredArgsConstructor
@Slf4j
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

    // TODO
    @GetMapping("/profile")
    public ProfileResp getUserProfile(@CurrentUser User user) {
        return userFacade.getUserProfile(user);
    }

}
