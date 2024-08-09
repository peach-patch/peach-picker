package com.peach.backend.domain.user.controller;

import com.peach.backend.domain.user.dto.kakao.KakaoCodeReq;
import com.peach.backend.domain.user.dto.req.ProfileUpdateReq;
import com.peach.backend.domain.user.dto.req.SignInReq;
import com.peach.backend.domain.user.dto.req.SignUpReq;
import com.peach.backend.domain.user.dto.resp.ProfileResp;
import com.peach.backend.domain.user.dto.resp.SignInResp;
import com.peach.backend.domain.user.entity.User;
import com.peach.backend.domain.user.facade.UserFacade;
import com.peach.backend.global.security.dto.CurrentUser;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
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

    @PostMapping("sign-in")
    public SignInResp signIn(@RequestBody SignInReq req) {
        return userFacade.signIn(req);
    }

    @GetMapping("profile")
    public ProfileResp getUserProfile(@CurrentUser User user) {
        return userFacade.getUserProfile(user);
    }

    @PatchMapping("profile")
    public ResponseEntity<String> patchUserProfile(@CurrentUser User user, @ModelAttribute ProfileUpdateReq req) {
        userFacade.patchUserProfile(user, req);
        return ResponseEntity.ok("회원정보 수정이 완료되었습니다.");
    }

    @PostMapping("kakao-login")
    public ResponseEntity<SignInResp> kakaoLogin(@RequestBody KakaoCodeReq kakaoReq) {
        return ResponseEntity.ok(userFacade.KakaoLogin(kakaoReq));
    }

    @GetMapping("/code/send")
    public ResponseEntity<String> sendVerifyingCode(@RequestParam(name = "email") String email) {
        userFacade.sendVerificationEmail(email);

        return ResponseEntity.ok("인증코드가 발송되었습니다.");
    }

    @GetMapping("/code/verify")
    public ResponseEntity<String> verifyingCode(@RequestParam(name = "email") String email, @RequestParam(name = "code") String code) {
        userFacade.verifyingCode(email, code);

        return ResponseEntity.ok("인증이 완료되었습니다.");
    }
}
