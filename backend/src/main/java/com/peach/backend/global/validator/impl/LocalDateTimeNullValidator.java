package com.peach.backend.global.validator.impl;


import com.peach.backend.global.validator.annotation.FiveMinuteInterval;
import com.peach.backend.global.validator.annotation.LocalDateTimeNull;
import jakarta.validation.ConstraintValidator;
import jakarta.validation.ConstraintValidatorContext;
import lombok.extern.slf4j.Slf4j;

import java.time.LocalDateTime;

@Slf4j
public class LocalDateTimeNullValidator implements ConstraintValidator<LocalDateTimeNull, LocalDateTime> {
    @Override
    public boolean isValid(LocalDateTime dateTime, ConstraintValidatorContext context) {
        return dateTime != null;
    }
}