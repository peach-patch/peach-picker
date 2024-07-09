package com.peach.backend.global.error;

import com.peach.backend.global.error.exception.ErrorCode;
import com.peach.backend.global.error.exception.ErrorProperty;
import com.peach.backend.global.error.exception.PeachPickerException;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.BindException;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestControllerAdvice;
import org.springframework.web.servlet.mvc.method.annotation.ResponseEntityExceptionHandler;

@RestControllerAdvice
@Slf4j
public class PeachPickerExceptionHandler {

    @ExceptionHandler(PeachPickerException.class)
    public ResponseEntity<Object> handleCustomException(PeachPickerException e) {
        e.printStackTrace();
        log.error("Peach Picker Exception : " + e.getErrorProperty().getMessage());
        return handleExceptionInternal(e.getErrorProperty());
    }

    @ExceptionHandler(IllegalArgumentException.class)
    public ResponseEntity<Object> handleIllegalArgument(IllegalArgumentException e) {
        log.error("IllegalArgument : " + e.getMessage(), e);
        ErrorProperty errorProperty = ErrorCode.BAD_REQUEST;
        return handleExceptionInternal(errorProperty, e.getMessage());
    }

    @ExceptionHandler(MethodArgumentNotValidException.class)
    public ResponseEntity<Object> handleMethodArgumentNotValidationException(MethodArgumentNotValidException e) {
        String message = e.getBindingResult().getAllErrors().get(0).getDefaultMessage();
        log.error("Method : " + message, e);
        ErrorProperty errorProperty = ErrorCode.BAD_REQUEST;
        return handleExceptionInternal(errorProperty, message);
    }

    @ExceptionHandler({Exception.class})
    public ResponseEntity<Object> handleAllException(Exception ex) {
        log.error("Exception : " + ex.getMessage(), ex);
        ErrorProperty errorProperty = ErrorCode.INTERNAL_SERVER_ERROR;
        return handleExceptionInternal(errorProperty.getStatus(), errorProperty.getMessage());
    }

    private ResponseEntity<Object> handleExceptionInternal(HttpStatus status, String message) {
        return ResponseEntity.status(status)
                .body(makeErrorResponse(status, message));
    }

    private ErrorResponse makeErrorResponse(HttpStatus status, String message) {
        return ErrorResponse.builder()
                .status(status)
                .message(message)
                .build();
    }

    private ResponseEntity<Object> handleExceptionInternal(ErrorProperty errorProperty, String message) {
        return ResponseEntity.status(errorProperty.getStatus())
                .body(makeErrorResponse(errorProperty, message));
    }

    private ErrorResponse makeErrorResponse(ErrorProperty errorProperty, String message) {
        return ErrorResponse.builder()
                .status(errorProperty.getStatus())
                .message(message)
                .build();
    }

    private ResponseEntity<Object> handleExceptionInternal(ErrorProperty errorProperty) {
        return ResponseEntity.status(errorProperty.getStatus())
                .body(makeErrorResponse(errorProperty));
    }

    private ErrorResponse makeErrorResponse(ErrorProperty errorProperty) {
        return ErrorResponse.builder()
                .status(errorProperty.getStatus())
                .message(errorProperty.getMessage())
                .build();
    }
}
