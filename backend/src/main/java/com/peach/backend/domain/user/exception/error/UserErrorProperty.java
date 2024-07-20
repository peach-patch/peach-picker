package com.peach.backend.domain.user.exception.error;

import com.peach.backend.global.error.exception.ErrorProperty;
import lombok.Getter;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;


@Getter
@RequiredArgsConstructor
public enum UserErrorProperty implements ErrorProperty {
    LOGIN_FAIL(HttpStatus.UNAUTHORIZED, "로그인에 실패하였습니다. 이메일 또는 비밀번호를 확인하세요."),
    SIGN_UP_FAIL(HttpStatus.CONFLICT, "회원가입에 실패하였습니다."),
    USER_ALREADY_EXIST(HttpStatus.CONFLICT, "이미 가입된 유저입니다."),
    USER_NOT_FOUND(HttpStatus.NOT_FOUND, "해당 유저를 찾을 수 없습니다.")
    ;

    private final HttpStatus status;
    private final String message;
}