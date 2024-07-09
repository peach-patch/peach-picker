package com.peach.backend.global.validator.impl;


import com.peach.backend.global.validator.annotation.RequestNotNull;
import jakarta.validation.ConstraintValidator;
import jakarta.validation.ConstraintValidatorContext;
import java.time.LocalDateTime;

public class RequestNotNullValidator implements ConstraintValidator<RequestNotNull, Object> {
    @Override
    public boolean isValid(Object object, ConstraintValidatorContext context) {
        return object != null;
    }
}