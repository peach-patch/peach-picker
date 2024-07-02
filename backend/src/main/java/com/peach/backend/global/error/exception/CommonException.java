package com.peach.backend.global.error.exception;

import lombok.Getter;
import lombok.ToString;
import org.springframework.http.HttpStatus;

@Getter
@ToString
public class CommonException extends RuntimeException {
    private final HttpStatus status;
    private final String messageProperty;

    public CommonException(HttpStatus status, String messageProperty) {
        this.status = status;
        this.messageProperty = messageProperty;
    }
}
