package com.peach.backend.domain.user.exception;


import com.peach.backend.domain.user.exception.error.UserErrorProperty;
import com.peach.backend.global.error.exception.PeachPickerException;

public class UserNotFoundException extends PeachPickerException {

    public final static UserNotFoundException EXCEPTION = new UserNotFoundException();

    private UserNotFoundException() {
        super(UserErrorProperty.USER_NOT_FOUND);
    }
}
