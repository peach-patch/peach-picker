package com.peach.backend.global.security.exception;

import com.peach.backend.global.error.exception.PeachPickerException;
import com.peach.backend.global.security.exception.error.JwtErrorProperty;

public class ExpiredTokenException extends PeachPickerException {

    public final static ExpiredTokenException EXCEPTION = new ExpiredTokenException();

    private ExpiredTokenException() {
        super(JwtErrorProperty.EXPIRED_TOKEN);
    }
}