package com.peach.backend.domain.user.facade;

import com.peach.backend.domain.user.dto.kakao.KakaoCodeReq;
import com.peach.backend.domain.user.dto.req.ProfileUpdateReq;
import com.peach.backend.domain.user.dto.req.SignInReq;
import com.peach.backend.domain.user.dto.req.SignUpReq;
import com.peach.backend.domain.user.dto.resp.ProfileResp;
import com.peach.backend.domain.user.dto.resp.SignInResp;
import com.peach.backend.domain.user.entity.User;
import com.peach.backend.domain.user.service.*;
import com.peach.backend.global.security.util.JwtTokenProvider;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Component;

@Component
@RequiredArgsConstructor
public class UserFacade {

    private final CreateUserService createUserService;
    private final GetUserService getUserService;
    private final UpdateUserService updateUserService;
    private final KakaoLoginService kakaoLoginService;
    private final JwtTokenProvider jwtTokenProvider;
    private final EmailVerificationService emailVerificationService;

    public void signUp(SignUpReq req) {
        createUserService.createUser(req);
    }

    public SignInResp signIn(SignInReq req) {
        User user = getUserService.findUserByEmailAndPassword(req);

        return SignInResp.builder()
                .accessToken(jwtTokenProvider.generateAccessToken(user.getEmail()))
                .build();
    }

    public ProfileResp getUserProfile(User user) {
        return getUserService.getUserProfileByJwtToken(user);
    }

    public void patchUserProfile(User user, ProfileUpdateReq req) {
        updateUserService.updateUser(user, req);
    }

    public SignInResp KakaoLogin(KakaoCodeReq req) {
        User user = kakaoLoginService.kakaoLogin(req);
        return SignInResp.builder()
                .accessToken(jwtTokenProvider.generateAccessToken(user.getEmail()))
                .build();
    }

    public void sendVerificationEmail(String email) {
        emailVerificationService.sendVerificationEmail(email);
    }

    public void verifyingCode(String email, String code) {
        emailVerificationService.verifyingCode(email, code);
    }
}
