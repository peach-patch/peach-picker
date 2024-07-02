package com.peach.backend.domain.user.exception;


import com.peach.backend.domain.user.exception.error.UserErrorProperty;
import com.peach.backend.global.error.exception.PeachPickerException;

public class LoginFailException extends PeachPickerException {

    public final static LoginFailException EXCEPTION = new LoginFailException();

    private LoginFailException() {
        super(UserErrorProperty.LOGIN_FAIL);
    }
}
