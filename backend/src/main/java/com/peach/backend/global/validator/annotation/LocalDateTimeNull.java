package com.peach.backend.global.validator.annotation;


import com.peach.backend.global.validator.impl.FiveMinuteIntervalValidator;
import com.peach.backend.global.validator.impl.LocalDateTimeNullValidator;
import jakarta.validation.Constraint;
import jakarta.validation.Payload;

import java.lang.annotation.ElementType;
import java.lang.annotation.Retention;
import java.lang.annotation.RetentionPolicy;
import java.lang.annotation.Target;

@Target({ ElementType.FIELD, ElementType.METHOD, ElementType.PARAMETER })
@Retention(RetentionPolicy.RUNTIME)
@Constraint(validatedBy = LocalDateTimeNullValidator.class)
public @interface LocalDateTimeNull {
    String message() default "시각을 입력해주세요.";
    Class<?>[] groups() default {};
    Class<? extends Payload>[] payload() default {};
}
