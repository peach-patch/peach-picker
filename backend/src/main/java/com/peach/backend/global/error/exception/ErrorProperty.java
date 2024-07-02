package com.peach.backend.global.error.exception;

import org.springframework.http.HttpStatus;

public interface ErrorProperty {
    HttpStatus getStatus();

    String getMessage();
}
