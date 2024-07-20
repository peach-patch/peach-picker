package com.peach.backend.global.util.exception.error;

import com.peach.backend.global.error.exception.ErrorProperty;
import lombok.Getter;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;


@Getter
@RequiredArgsConstructor
public enum CsvErrorProperty implements ErrorProperty {

    CSV_READ_ERROR(HttpStatus.NOT_FOUND, "csv 파일을 읽는 중 문제가 발생하였습니다.")
    ;

    private final HttpStatus status;
    private final String message;
}