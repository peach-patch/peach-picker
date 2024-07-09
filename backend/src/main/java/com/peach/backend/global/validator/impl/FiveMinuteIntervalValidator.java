package com.peach.backend.global.validator.impl;


import com.peach.backend.global.validator.annotation.FiveMinuteInterval;
import jakarta.validation.ConstraintValidator;
import jakarta.validation.ConstraintValidatorContext;
import lombok.extern.slf4j.Slf4j;

import java.time.LocalDateTime;

@Slf4j
public class FiveMinuteIntervalValidator implements ConstraintValidator<FiveMinuteInterval, LocalDateTime> {
    @Override
    public boolean isValid(LocalDateTime dateTime, ConstraintValidatorContext context) {
        if(dateTime == null) return true;

        int minute = dateTime.getMinute();

        return minute % 5 == 0;
    }
}