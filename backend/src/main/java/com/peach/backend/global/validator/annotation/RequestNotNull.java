package com.peach.backend.global.validator.annotation;


import com.peach.backend.global.validator.impl.RequestNotNullValidator;
import jakarta.validation.Constraint;
import jakarta.validation.Payload;

import java.lang.annotation.ElementType;
import java.lang.annotation.Retention;
import java.lang.annotation.RetentionPolicy;
import java.lang.annotation.Target;

@Target({ ElementType.FIELD, ElementType.METHOD, ElementType.PARAMETER })
@Retention(RetentionPolicy.RUNTIME)
@Constraint(validatedBy = RequestNotNullValidator.class)
public @interface RequestNotNull {
    String message() default "요청이 비어있습니다.";
    Class<?>[] groups() default {};
    Class<? extends Payload>[] payload() default {};
}
