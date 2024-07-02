package com.peach.backend.domain.user.exception;


import com.peach.backend.domain.user.exception.error.UserErrorProperty;
import com.peach.backend.global.error.exception.PeachPickerException;

public class SignUpFailException extends PeachPickerException {

    public final static SignUpFailException EXCEPTION = new SignUpFailException();

    private SignUpFailException() {
        super(UserErrorProperty.SIGN_UP_FAIL);
    }
}
