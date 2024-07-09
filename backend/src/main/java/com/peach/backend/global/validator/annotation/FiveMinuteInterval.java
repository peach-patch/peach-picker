package com.peach.backend.global.validator.annotation;


import com.peach.backend.global.validator.impl.FiveMinuteIntervalValidator;
import jakarta.validation.Constraint;
import jakarta.validation.Payload;

import java.lang.annotation.ElementType;
import java.lang.annotation.Retention;
import java.lang.annotation.RetentionPolicy;
import java.lang.annotation.Target;

@Target({ ElementType.FIELD, ElementType.METHOD, ElementType.PARAMETER })
@Retention(RetentionPolicy.RUNTIME)
@Constraint(validatedBy = FiveMinuteIntervalValidator.class)
public @interface FiveMinuteInterval {
    String message() default "추첨 시각은 5분 단위로 지정할 수 있습니다.";
    Class<?>[] groups() default {};
    Class<? extends Payload>[] payload() default {};
}
