package com.peach.backend.global.security.exception;


import com.peach.backend.global.error.exception.PeachPickerException;
import com.peach.backend.global.security.exception.error.JwtErrorProperty;

public class InvalidTokenException extends PeachPickerException {

    public final static InvalidTokenException EXCEPTION = new InvalidTokenException();

    private InvalidTokenException() {
        super(JwtErrorProperty.INVALID_TOKEN);
    }
}