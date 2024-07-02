package com.peach.backend.domain.user.exception;


import com.peach.backend.domain.user.exception.error.UserErrorProperty;
import com.peach.backend.global.error.exception.PeachPickerException;

public class UserAlreadyExistException extends PeachPickerException {

    public final static UserAlreadyExistException EXCEPTION = new UserAlreadyExistException();

    private UserAlreadyExistException() {
        super(UserErrorProperty.USER_ALREADY_EXIST);
    }
}
