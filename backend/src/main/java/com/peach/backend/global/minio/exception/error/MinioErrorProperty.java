package com.peach.backend.global.minio.exception.error;

import com.peach.backend.global.error.exception.ErrorProperty;
import lombok.Getter;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;


@Getter
@RequiredArgsConstructor
public enum MinioErrorProperty implements ErrorProperty {

    MINIO_OBJECT_NOT_FOUND(HttpStatus.NOT_FOUND, "미니오에서 해당 오브젝트를 찾을 수 없습니다."),
    ;

    private final HttpStatus status;
    private final String message;
}