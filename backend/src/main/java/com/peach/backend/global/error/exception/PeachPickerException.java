package com.peach.backend.global.error.exception;

import lombok.Getter;
import lombok.RequiredArgsConstructor;
import lombok.ToString;

@Getter
@ToString
@RequiredArgsConstructor
public class PeachPickerException extends RuntimeException {
    private final ErrorProperty errorProperty;
    private String message;

    public PeachPickerException(String message, ErrorProperty errorProperty) {
        this.message = message;
        this.errorProperty = errorProperty;
    }
}
