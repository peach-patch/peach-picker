package com.peach.backend.domain.drawing.exception.error;

import com.peach.backend.global.error.exception.ErrorProperty;
import lombok.Getter;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;


@Getter
@RequiredArgsConstructor
public enum DrawingErrorProperty implements ErrorProperty {
    DRAWING_NOT_FOUND(HttpStatus.NOT_FOUND, "해당 추첨을 찾을 수 없습니다.")
    ;

    private final HttpStatus status;
    private final String message;
}